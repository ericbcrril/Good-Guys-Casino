import React, { useState } from 'react';
import Bet from './bet';
import GunSelection from './gunSelection';
import StatusBar from './statusBar';

const Game = () => {
  const [gameState, setGameState] = useState('betting'); // 'betting', 'gunSelection', 'playing', 'gameOver'
  const [bet, setBet] = useState(20);
  const [multiplier, setMultiplier] = useState(1);
  const [selectedGun, setSelectedGun] = useState(null);
  const [health, setHealth] = useState(100);
  const [coins, setCoins] = useState(100);
  const [nd, setNd] = useState(0);

  const handleBet = (amount, multiplier) => {
    setBet(amount);
    setMultiplier(multiplier);
    setGameState('gunSelection');
  };

  const handleGunSelection = (gun) => {
    setSelectedGun(gun);
    setGameState('playing');
  };

  const playRound = () => {
    const bulletChance = nd / 6;
    const gunJamChance = 1 / 100;
    if (Math.random() < bulletChance) {
      setHealth(0);
      setGameState('gameOver');
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
    setNd(0);
    setGameState('betting');
  };

  return (
    <div>
      {gameState === 'betting' && <Bet onBet={handleBet} />}
      {gameState === 'gunSelection' && <GunSelection onSelectGun={handleGunSelection} />}
      {gameState === 'playing' && (
        <div>
          <StatusBar health={health} coins={coins} />
          <button onClick={playRound}>Disparar</button>
        </div>
      )}
      {gameState === 'gameOver' && (
        <div>
          <h2>Fin del Juego</h2>
          <button onClick={resetGame}>Reiniciar</button>
        </div>
      )}
    </div>
  );
};

export default Game;
