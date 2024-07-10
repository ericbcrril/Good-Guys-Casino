import React, { useState, useEffect } from 'react';

export const [gameState, setGameState] = useState('betting'); // 'betting', 'gunSelection', 'playing', 'gameOver', 'goodEnding'
export const [message, setMessage] = useState('Empieza el juego...'); // Mensaje de conclusión del juego
export const [bet, setBet] = useState(20); // Apuesta seleccionada
export const [multiplier, setMultiplier] = useState(1); // Multiplicador seleccionado
export const [selectedGun, setSelectedGun] = useState(null); // Revolver seleccionado
export const [health, setHealth] = useState(100); // Salud del jugador
export const [initialCoins, setInitialCoins] = useState(coins); // Monedas iniciales antes de comenzar el juego
export const [bullets, setBullets] = useState(1); // Cantidad de balas que eligió el jugador
export const [turns, setTurns] = useState(0); // Turnos jugados
export const [shotsFired, setShotsFired] = useState(0); // Veces en las que se disparó el arma
export const [bulletFired, setBulletFired] = useState(0); // Veces en las que había bala en el disparo
export const [isShootButtonDisabled, setShootButtonDisabled] = useState(false); // Estado para manejar la desactivación del botón disparar
export const [isResetButtonDisabled, setResetButtonDisabled] = useState(true); // Estado para manejar la desactivación del botón reiniciar


const handleBet = (amount) => {
    setBet(amount);
    setInitialCoins(coins);
    setCoins(coins - amount);
    setGameState('gunSelection');
  };

  const handleGunSelection = (gun, numShots) => {
    // Aquí deberías manejar la reproducción de sonidos en React Native si es necesario
    setSelectedGun(gun);
    setMultiplier(gun.multiplier + (numShots * 2));
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
      // Aquí deberías manejar la reproducción de sonidos en React Native si es necesario
      setScreenShake(true); // Activar temblor
      setTimeout(() => setScreenShake(false), 200);
      setMessage('Te tocó bala!');
      newHealth -= selectedGun.damage;
      newCoins -= bet * multiplier;
      newBulletFired += 1;
    } else { // No hay bala
      // Aquí deberías manejar la reproducción de sonidos en React Native si es necesario
      setMessage('¡Qué suerte, no hay bala!');
      newCoins += bet * multiplier;
    }

    if (newHealth <= 0) { // Se acabó tu salud
      setMessage('Has muerto...');
      newGameState = 'gameOver';
      newCoins -= turns * (bet * multiplier);
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

export { handleBet, handleGunSelection, playRound, resetGame, withdraw };