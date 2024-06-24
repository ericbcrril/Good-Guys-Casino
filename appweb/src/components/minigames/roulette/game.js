import React, { useState, useEffect } from 'react';
import Bet from './bet';
import GunSelection from './gunSelection';
import StatusBar from './statusBar';
//Efectos de sonido
import {gunshotSound, emptyGunshotSound, revolverSpinSound} from '../../../constants/sounds/sounds';

const Game = ({setScreenShake}) => {
  const [gameState, setGameState] = useState('betting'); // 'betting', 'gunSelection', 'playing', 'gameOver', 'goodEnding'
  const [bet, setBet] = useState(20); // Apuesta seleccionada
  const [multiplier, setMultiplier] = useState(1); // Multiplicador seleccionado
  const [selectedGun, setSelectedGun] = useState(null); // Revolver seleccionado
  const [health, setHealth] = useState(100); // Salud del jugador
  const [coins, setCoins] = useState(100); // Monedas
  const [coinsEarned, setCoinsEarned] = useState(0); //Monedas ganadas
  const [nd, setNd] = useState(1);// Cantidad de balas que eligio el jugador
  const [turns, setTurns] = useState(0);// Turnos jugados 
  const [shotsFired, setShotsFired] = useState(0);// Veces en las que se disparo el arma
  const [bulletFired, setBulletFired] = useState(0); // Veces en las que habia bala en el disparo
  const [isShootButtonDisabled, setShootButtonDisabled] = useState(false); // Estado para manejar la desactivación del botón disparar

  const handleBet = (amount, multiplier) => {
    setBet(amount);
    setMultiplier(multiplier);
    setGameState('gunSelection');
  };

  const handleGunSelection = (gun, numShots) => {
    let casillasBala = generateBullets(numShots);
  
    // Verificar si casillasBala es válida
    const isValid = casillasBala && casillasBala.length === 6 && casillasBala.every((casilla) => casilla !== null);
  
    if (!isValid) {
      // Si las casillasBala no son válidas, manejar el error
      console.error('Error al generar casillasBala. Regenerando...');
  
      // Intentar generar de nuevo
      casillasBala = generateBullets(numShots);
  
      // Verificar la validez de la nueva generación
      if (!casillasBala || casillasBala.length !== 6 || casillasBala.some((casilla) => casilla === null)) {
        console.error('No se pudo generar casillasBala correctamente. Revisar la función generateBullets.');
        return;
      }
    }
  
    // Asignar el arma seleccionado con las casillasBala generadas
    setSelectedGun({ ...gun, casillasBala });
    console.log("Arma:", gun);
    console.log("Cartucho del arma:", casillasBala);
  
    // Otros pasos después de seleccionar el arma
    setNd(numShots);
    revolverSpinSound.play();
    setTimeout(() => {
      setGameState('playing');
    }, 2000); 
  };
  
  
  
  

  const generateBullets = (numShots) => {
    let casillas = Array(6).fill(false); // Inicializamos todas las casillas como false
    let shotsPlaced = 0;
  
    // Verificar si ya hay casillas con balas (false)
    const allFalse = casillas.every((value) => value === false);
    if (!allFalse) {
      // Si hay balas ya colocadas, reiniciamos todas las casillas a false
      casillas = Array(6).fill(false);
    }
  
    // Colocar las balas aleatoriamente
    while (shotsPlaced < numShots) {
      const randomIndex = Math.floor(Math.random() * 6);
      if (!casillas[randomIndex]) {
        casillas[randomIndex] = true;
        shotsPlaced++;
      }
    }
  
    return casillas;
  };
  
  
  
  

  const playRound = () => {
    setShootButtonDisabled(true); // Desactivar el botón de disparo
  
    setTurns(turns + 1);
    setShotsFired(shotsFired + 1);
  
    const availableCasillas = selectedGun.casillasBala.filter(casilla => casilla !== null);
    const randomIndex = Math.floor(Math.random() * availableCasillas.length);
    const isBullet = availableCasillas[randomIndex];
  
    // Eliminar la casilla disparada de la lista 
    selectedGun.casillasBala[randomIndex] = null;
  
    if (isBullet) {//Toco bala
      gunshotSound.play();
      setScreenShake(true); // Activar temblor
      setTimeout(() => {
        setScreenShake(false); // Desactivar temblor después de un breve tiempo
      }, 200);
      console.log('Te tocó bala!');
      const newHealth = health - selectedGun.damage;
      setHealth(newHealth);
      setCoinsEarned(coinsEarned - bet);
      setCoins(coins - bet);
      setBulletFired(bulletFired + 1);
      setShootButtonDisabled(false)
      if (newHealth <= 0) {
        setGameState('gameOver');
      } else if (bulletFired >= (nd - 1) && health > 0) { //te toca bala y ya disparaste el No de balas seleccionadas
        setCoinsEarned(coinsEarned - bet);  
        setGameState('goodEnding');
      }
    } else {//No hay bala
      emptyGunshotSound.play();
      setCoins(coins * multiplier);
      setCoinsEarned(coinsEarned + bet);
      setCoins(coins + bet);
      console.log("Monedas ganadas:", coinsEarned);
      console.log(selectedGun);
      setShootButtonDisabled(false)
      if (shotsFired >= 5) {
        console.log("Ups! ¿Y la bala?");
        setGameState('goodEnding');
      }
    }
  
    // Desactivar temblor después de un breve tiempo
    setTimeout(() => {
      setScreenShake(false);
    }, 200);
  };
  

  const resetGame = () => {
    setHealth(100);
    setCoinsEarned(bet);
    setNd(1);
    setTurns(0);
    setShotsFired(0);
    setGameState('betting');
  };

  const withdraw = () => {
    setGameState('goodEnding');
  };

  return (
    <div>
      {gameState === 'betting' && <Bet onBet={handleBet} />}
      {gameState === 'gunSelection' && <GunSelection onSelectGun={handleGunSelection} />}
      {gameState === 'playing' && (
        <div>
          <StatusBar health={health} coins={coins} />
          <button className="game-button" onClick={playRound} disabled={isShootButtonDisabled}>Disparar</button>
          <button className="game-button" onClick={withdraw}>Retirarse</button>
        </div>
      )}
      {gameState === 'gameOver' && (
        <div>
          <h2 className="game-over-message">Fin del Juego</h2>
          <p className="game-over-text">Has perdido todo tu dinero.</p>
          <button className="reset-button" onClick={resetGame}>Reiniciar</button>
        </div>
      )}
      {gameState === 'goodEnding' && (
        <div>
          <h2 className="game-over-message">¡Felicidades!</h2>
          <p className="game-over-text">Turnos jugados: {turns}</p>
          <p className="game-over-text">Dinero ganado: {coinsEarned}</p>
          <p className="game-over-text">Salud restante: {health}</p>
          <button className="reset-button" onClick={resetGame}>Reiniciar</button>
        </div>
      )}
    </div>
  );  
};

export default Game;
