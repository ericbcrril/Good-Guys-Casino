import React, { useState, useEffect } from 'react';
import Bet from './bet';
import GunSelection from './gunSelection';
import StatusBar from './statusBar';
//Efectos de sonido
import {gunshotSound, emptyGunshotSound, revolverSpinSound} from '../../../constants/sounds/sounds';

const Game = ({setScreenShake, coins, setCoins, setVisibleH1}) => {
  const [gameState, setGameState] = useState('betting'); // 'betting', 'gunSelection', 'playing', 'gameOver', 'goodEnding'
  const [bet, setBet] = useState(20); // Apuesta seleccionada
  const [multiplier, setMultiplier] = useState(1); // Multiplicador seleccionado
  const [selectedGun, setSelectedGun] = useState(null); // Revolver seleccionado
  const [health, setHealth] = useState(100); // Salud del jugador
  const [coinsEarned, setCoinsEarned] = useState(0); //Monedas ganadas
  const [nd, setNd] = useState(1);// Cantidad de balas que eligio el jugador
  const [turns, setTurns] = useState(0);// Turnos jugados 
  const [shotsFired, setShotsFired] = useState(0);// Veces en las que se disparo el arma
  const [bulletFired, setBulletFired] = useState(0); // Veces en las que habia bala en el disparo
  const [isShootButtonDisabled, setShootButtonDisabled] = useState(false); // Estado para manejar la desactivación del botón disparar

  const handleBet = (amount, multiplier) => {
    setBet(amount);
    setCoins(coins - amount);
    setMultiplier(multiplier);
    setGameState('gunSelection');
  };

  const handleGunSelection = (gun, numShots) => {
    // Asignar el arma seleccionado con las casillasBala generadas
    setSelectedGun(gun);
    console.log("Arma:", gun);
  
    // Otros pasos después de seleccionar el arma
    setNd(numShots);
    revolverSpinSound.play();
    setTimeout(() => {
    setVisibleH1(false);
      setGameState('playing');
    }, 2000); 
  };

  const playRound = () => {
    setShootButtonDisabled(true); // Desactivar el botón de disparo
  
    const probabiliy = (nd - bulletFired) / (6 - turns);
    const isBullet = Math.random() < probabiliy;
  
    const newTurns = turns + 1;
    const newShotsFired = shotsFired + 1;
    let newHealth = health;
    let newCoins = coins;
    let newCoinsEarned = coinsEarned;
    let newBulletFired = bulletFired;
    let newGameState = null;
  
    if (isBullet) { // Toco bala
      gunshotSound.play();
      setScreenShake(true); // Activar temblor
      setTimeout(() => {
        setScreenShake(false); // Desactivar temblor después de un breve tiempo
      }, 200);
      console.log('Te tocó bala!');
      newHealth -= selectedGun.damage;
      newCoinsEarned -= bet * multiplier;
      newCoins -= bet * multiplier;
      newBulletFired += 1;
    } else { // No hay bala
      emptyGunshotSound.play();
      newCoinsEarned += bet * multiplier;
      newCoins += bet * multiplier;
      console.log("Monedas ganadas:", newCoinsEarned);
      console.log(selectedGun);
    }
  
    if (newHealth <= 0) { // Se acabó tu salud ;(
      console.log("Se acabó tu salud ;(");
      newGameState = 'gameOver';
    }
    if (newTurns > 5 && newHealth > 0) { // Has sobrevivido a los 6 tiros
      console.log("Sobreviviste los 6 tiros!");
      newGameState = 'goodEnding';
    }
    if (newBulletFired === nd && newHealth > 0) { // Se han disparado todas las balas
      console.log("Se han disparado todas las balas"); 
      newGameState = 'goodEnding';
    }
    if (newShotsFired > 5 && newBulletFired < nd) { // Error
      console.log("¡Ups! ¿Y la bala?");
      newGameState = 'goodEnding';
    }
  
    // Actualizar estados
    setTurns(newTurns);
    setShotsFired(newShotsFired);
    setHealth(newHealth);
    setCoins(newCoins);
    setCoinsEarned(newCoinsEarned);
    setBulletFired(newBulletFired);
    setShootButtonDisabled(false);
  
    if (newGameState) {
      setGameState(newGameState);
    }
  
    // Desactivar temblor
    setTimeout(() => {
      setScreenShake(false);
    }, 200);
  };

  const resetGame = () => {
    setHealth(100);
    setCoinsEarned(0);
    setBulletFired(0);
    setNd(1);
    setTurns(0);
    setShotsFired(0);
    setGameState('betting');
    setVisibleH1(true);
  };

  const withdraw = () => {
    setGameState('goodEnding');
  };

  return (
    <div>
      {gameState === 'betting' && <Bet onBet={handleBet} coins={coins} />}
      {gameState === 'gunSelection' && <GunSelection onSelectGun={handleGunSelection} />}
      {gameState === 'playing' && (
        <div className='game-container'>
          <button className="game-button" onClick={playRound} disabled={isShootButtonDisabled}>Disparar</button>
          <button className="game-button" onClick={withdraw}>Retirarse</button>
          <StatusBar health={health} coins={coinsEarned} />
        </div>
      )}
      {gameState === 'gameOver' && (
        <div className='game-container'>
          <h2 className="game-over-message">Fin del Juego</h2>
          <p className="game-over-text">Has perdido todo tu dinero.</p>
          <p className="game-over-text">Balance: {coinsEarned > 0 ? `+${coinsEarned}` : coinsEarned}</p>
          <button className="reset-button" onClick={resetGame}>Reiniciar</button>
        </div>
      )}
      {gameState === 'goodEnding' && (
        <div className='game-container'>
          <h2 className="game-over-message">¡Felicidades!</h2>
          <p className="game-over-text">Turnos jugados: {turns}</p>
          <p className="game-over-text">Salud restante: {health}</p>
          <p className="game-over-text">Balance: {coinsEarned > 0 ? `+${coinsEarned}` : coinsEarned}</p>
          <button className="reset-button" onClick={resetGame}>Reiniciar</button>
        </div>
      )}
    </div>
  );  
};

export default Game;
