import React, { useState, useEffect } from 'react';
import Bet from './bet';
import GunSelection from './gunSelection';
import StatusBar from './statusBar';
// Efectos de sonido
import { gunshotSound, emptyGunshotSound, revolverSpinSound } from '../../../constants/sounds/sounds';

const Game = ({ setScreenShake, coins, setCoins }) => {
  const [gameState, setGameState] = useState('betting'); // 'betting', 'gunSelection', 'playing', 'gameOver', 'goodEnding'
  const [message, setMessage] = useState('Empieza el juego...'); // Mensaje de conclusión del juego
  const [bet, setBet] = useState(20); // Apuesta seleccionada
  const [multiplier, setMultiplier] = useState(1); // Multiplicador seleccionado
  const [selectedGun, setSelectedGun] = useState(null); // Revolver seleccionado
  const [health, setHealth] = useState(100); // Salud del jugador
  const [initialCoins, setInitialCoins] = useState(coins); // Monedas iniciales antes de comenzar el juego
  const [bullets, setBullets] = useState(1); // Cantidad de balas que eligió el jugador
  const [turns, setTurns] = useState(0); // Turnos jugados
  const [shotsFired, setShotsFired] = useState(0); // Veces en las que se disparó el arma
  const [bulletFired, setBulletFired] = useState(0); // Veces en las que había bala en el disparo
  const [isShootButtonDisabled, setShootButtonDisabled] = useState(false); // Estado para manejar la desactivación del botón disparar
  const [isResetButtonDisabled, setResetButtonDisabled] = useState(true);

  const handleBet = (amount) => {
    setBet(amount);
    setInitialCoins(coins);
    setCoins(coins - amount);
    setGameState('gunSelection');
  };

  const handleGunSelection = (gun, numShots) => {
    revolverSpinSound.play();
    setSelectedGun(gun);
    setMultiplier(gun.multiplier += (numShots * 2));
    setBullets(numShots);
    setTimeout(() => {
      setGameState('playing');
    }, 2000);
  };

  const playRound = () => {
    setShootButtonDisabled(true); // Desactivar el botón de disparo
    const probability = (bullets - bulletFired) / (6 - turns);
    const isBullet = Math.random() < probability;

    const newTurns = turns + 1;
    const newShotsFired = shotsFired + 1;
    let newHealth = health;
    let newCoins = coins;
    let newBulletFired = bulletFired;
    let newGameState = null;

    if (isBullet) { // Toco bala
      gunshotSound.play();
      setScreenShake(true); // Activar temblor
      setTimeout(() => setScreenShake(false), 200);
      setMessage('Te tocó bala!');
      newHealth -= selectedGun.damage;
      newCoins -= bet * multiplier;
      newBulletFired += 1;
    } else { // No hay bala
      emptyGunshotSound.play();
      setMessage('¡Qué suerte,no hay bala!');
      newCoins += bet * multiplier;
    }

    if (newHealth <= 0) { // Se acabó tu salud
      setMessage('Has muerto...');
      newGameState = 'gameOver';
      newCoins -= turns*(bet*multiplier);
    } else if (newTurns >= 6 || newBulletFired === bullets) { // Has sobrevivido a los 6 tiros o se han disparado todas las balas
      setMessage(newTurns >= 6 ? '¡Sobreviviste los 6 tiros!' : 'Se han disparado todas las balas');
      newGameState = 'goodEnding';
    }

    setTurns(newTurns);
    setShotsFired(newShotsFired);
    setHealth(newHealth);
    setCoins(newCoins);
    setBulletFired(newBulletFired);
    setShootButtonDisabled(false);
    setResetButtonDisabled(false);

    if (newGameState) {
      setGameState(newGameState);
    }
  };

  const resetGame = () => {
    setHealth(100);
    setBulletFired(0);
    setBullets(1);
    setTurns(0);
    setShotsFired(0);
    setGameState('betting');
    setMessage('Empieza el juego...');
    setResetButtonDisabled(true);
  };

  const withdraw = () => {
    setGameState('goodEnding');
  };

  return (
    <div>
      {gameState === 'betting' && <Bet onBet={handleBet} coins={coins} />}
      {gameState === 'gunSelection' && <GunSelection onSelectGun={handleGunSelection} />}
      {gameState === 'playing' && (
        <div className='game-actions'>
          <StatusBar health={health} coins={coins - initialCoins} />
          <div className='game-container' style={{display: 'flex', flexDirection: 'row'}}>
          <button className="game-button" onClick={playRound} disabled={isShootButtonDisabled}>Disparar</button>
          <button className="game-button" onClick={withdraw} disabled={isResetButtonDisabled}>Retirarse</button>
        </div>
        <div className= 'container-messages'>
            <p>{message}</p>
        </div>
        </div>
      )}
      {gameState === 'gameOver' && (
        <div className='game-container'>
          <h2 className="game-over-message">Fin del Juego</h2>
          <p>{message}</p>
          <p className="game-over-text">Has perdido toda tu apuesta.</p>
          <p className="game-over-text">Balance: {coins - initialCoins > 0 ? `+${coins - initialCoins}` : coins - initialCoins}</p>
          <button className="reset-button" onClick={resetGame}>Reiniciar</button>
        </div>
      )}
      {gameState === 'goodEnding' && (
        <div className='game-container'>
          <h2 className="game-over-message">{coins - initialCoins > 0 ? '¡Felicidades!':'¡Mala suerte!'}</h2>
          <p>{message}</p>
          <p className="game-over-text">Turnos jugados: {turns}</p>
          <p className="game-over-text">Salud restante: {health}</p>
          <p className="game-over-text">Balance: {coins - initialCoins > 0 ? `+${coins - initialCoins}` : coins - initialCoins}</p>
          <button className="reset-button" onClick={resetGame}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export default Game;
