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
  const [isShootButtonDisabled, setShootButtonDisabled] = useState(false); // Estado para manejar la desactivación del botón

  const handleBet = (amount, multiplier) => {
    setBet(amount);
    setMultiplier(multiplier);
    setGameState('gunSelection');
  };

  const handleGunSelection = (gun, numShots) => {
    let casillasBala = generateBullets(numShots);
    setSelectedGun({ ...gun, casillasBala: casillasBala });
    console.log("Arma:", gun);
    console.log("Cartucho del arma:", casillasBala);
    setNd(numShots);
    revolverSpinSound.play();
    setTimeout(() => {
      setGameState('playing');
    }, 2000); 
  };
  

  const generateBullets = (numShots) => {
    const casillas = Array(6).fill(false);//Creamos las 6 casillas de bala en el revolver
    let shotsPlaced = 0;
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
    setTimeout(() => setShootButtonDisabled(false), 1000); // Reactivar el botón después de 1 segundo
  
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
