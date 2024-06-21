import React, { useState } from 'react';
import Bet from './bet';
import GunSelection from './gunSelection';
import StatusBar from './statusBar';

const Game = () => {
  const [gameState, setGameState] = useState('betting'); // 'betting', 'gunSelection', 'playing', 'gameOver', 'goodEnding'
  const [bet, setBet] = useState(20);
  const [multiplier, setMultiplier] = useState(1);
  const [selectedGun, setSelectedGun] = useState(null);
  const [health, setHealth] = useState(100);
  const [coins, setCoins] = useState(100);
  const [nd, setNd] = useState(1); // Cantidad de tiros
  const [turns, setTurns] = useState(0);

  const handleBet = (amount, multiplier) => {
    setBet(amount);
    setMultiplier(multiplier);
    setGameState('gunSelection');
  };

  const handleGunSelection = (gun, numShots) => {
    setSelectedGun(gun);
    setNd(numShots);
    setGameState('playing');
  };

  const playRound = () => {
    setTurns(turns + 1);
    const bulletChance = nd / 6;
    const gunJamChance = 1 / 100;

    if (Math.random() < bulletChance) {
      alert('Te toco bala!');
      const newHealth = health - selectedGun.damage;
      setHealth(newHealth);
      if (newHealth <= 0) {
        setGameState('gameOver');
      }
    } else if (Math.random() < gunJamChance) {
      alert('El arma se atascó');
    } else {
      setCoins(coins + bet * multiplier);
      setNd(nd + 1);
    }
  };

  const resetGame = () => {
    setHealth(100);
    setCoins(100);
    setNd(1);
    setTurns(0);
    setGameState('betting');
  };

  const withdraw = () => {
    setGameState('goodEnding');
  };

  return (
    <div>
      {gameState === 'betting' && <Bet onBet={handleBet}  />}
      {gameState === 'gunSelection' && <GunSelection onSelectGun={handleGunSelection}  />}
      {gameState === 'playing' && (
        <div>
          <StatusBar health={health} coins={coins}  />
          <button className="game-button" onClick={playRound}>Disparar</button>
          <button className="game-button" onClick={withdraw}>Retirarse</button>
        </div>
      )}
      {gameState === 'gameOver' && (
        <div>
          <h2 className="game-over-message" >Fin del Juego</h2>
          <p className="game-over-text" >Has perdido todo tu dinero.</p>
          <button className="reset-button" onClick={resetGame}>Reiniciar</button>
        </div>
      )}
      {gameState === 'goodEnding' && (
        <div>
          <h2 className="game-over-message" >¡Felicidades!</h2>
          <p className="game-over-text" >Turnos jugados: {turns}</p>
          <p className="game-over-text" >Dinero ganado: {coins}</p>
          <button className="reset-button" onClick={resetGame}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export default Game;
