import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av'; // Importa el módulo de audio de Expo AV
import { styles } from 'assets/styles/minigames/styles';
import { stylesRoulette } from 'assets/styles/minigames/roulette';
import Bet from './bet';
import GunSelection from './gunSelection';
import StatusBar from './statusBar';
import {
  GameText,
  GameContainer,
  GameButton,
  TextGameButton,
  ResetButton,
} from 'components/minigames/roulette/components';

const Game = ({ setScreenShake, coins, setCoins }) => {
  // Estados del juego
  const [gameState, setGameState] = useState('betting');
  const [message, setMessage] = useState('Empieza el juego...');
  const [bet, setBet] = useState(20);
  const [multiplier, setMultiplier] = useState(1);
  const [selectedGun, setSelectedGun] = useState(null);
  const [health, setHealth] = useState(100);
  const [initialCoins, setInitialCoins] = useState(coins);
  const [bullets, setBullets] = useState(1);
  const [turns, setTurns] = useState(0);
  const [shotsFired, setShotsFired] = useState(0);
  const [bulletFired, setBulletFired] = useState(0);
  const [isShootButtonDisabled, setShootButtonDisabled] = useState(false);
  const [isResetButtonDisabled, setResetButtonDisabled] = useState(true);

  // Referencias a los sonidos
  const gunshotSound = React.useRef(new Audio.Sound());
  const emptyGunshotSound = React.useRef(new Audio.Sound());
  const revolverSpinSound = React.useRef(new Audio.Sound());

  useEffect(() => {
    // Carga los sonidos al montar el componente
    const loadSounds = async () => {
      try {
        await gunshotSound.current.loadAsync(
          require('assets/sounds/minigames/roulette/single-gunshot.mp3')
        );
        await emptyGunshotSound.current.loadAsync(
          require('assets/sounds/minigames/roulette/empty-gunshot.mp3')
        );
        await revolverSpinSound.current.loadAsync(
          require('assets/sounds/minigames/roulette/revolver-spin.mp3')
        );
      } catch (error) {
        console.log('Error loading sounds:', error);
      }
    };

    loadSounds();

    return () => {
      // Descarga los sonidos al desmontar el componente para liberar recursos
      gunshotSound.current.unloadAsync();
      emptyGunshotSound.current.unloadAsync();
    };
  }, []);

  // Función para reproducir el sonido de disparo
  const playGunshotSound = async () => {
    try {
      await gunshotSound.current.replayAsync();
    } catch (error) {
      console.log('Error playing gunshot sound:', error);
    }
  };

  // Función para reproducir el sonido de disparo vacío
  const playEmptyGunshotSound = async () => {
    try {
      await emptyGunshotSound.current.replayAsync();
    } catch (error) {
      console.log('Error playing empty gunshot sound:', error);
    }
  };

  const playrevolverSpinSound = async () => {
    try {
      await revolverSpinSound.current.replayAsync();
    } catch (error) {
      console.log('Error playing empty gunshot sound:', error);
    }
  };

  const handleBet = (amount) => {
    setBet(amount);
    setInitialCoins(coins);
    setCoins(coins - amount);
    setGameState('gunSelection');
  };

  const handleGunSelection = async (gun, numShots) => {
    await playrevolverSpinSound();
    setSelectedGun(gun);
    setMultiplier(gun.multiplier + numShots * 2);
    setBullets(numShots);
    setTimeout(() => {
      setGameState('playing');
    }, 2000);
  };

  const playRound = async () => {
    setShootButtonDisabled(true);

    const probability = (bullets - bulletFired) / (6 - turns);
    const isBullet = Math.random() < probability;

    const newTurns = turns + 1;
    const newShotsFired = shotsFired + 1;
    let newHealth = health;
    let newCoins = coins;
    let newBulletFired = bulletFired;
    let newGameState = null;

    if (isBullet) {
      await playGunshotSound();
      setScreenShake(true);
      setTimeout(() => setScreenShake(false), 200);
      setMessage('¡Te tocó bala!');
      newHealth -= selectedGun.damage;
      newCoins -= bet * multiplier;
      newBulletFired += 1;
    } else {
      await playEmptyGunshotSound();
      setMessage('¡Qué suerte, no hay bala!');
      newCoins += bet * multiplier;
    }

    if (newHealth <= 0) {
      setMessage('Has muerto...');
      newGameState = 'gameOver';
      newCoins -= turns * (bet * multiplier);
    } else if (newTurns >= 6 || newBulletFired === bullets) {
      setMessage(
        newTurns >= 6 ? '¡Sobreviviste los 6 tiros!' : 'Se han disparado todas las balas'
      );
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
    <View>
      {gameState === 'betting' && <Bet onBet={handleBet} coins={coins} />}
      {gameState === 'gunSelection' && <GunSelection onSelectGun={handleGunSelection} />}
      {gameState === 'playing' && (
        <View style={stylesRoulette.gameActions}>
          <StatusBar health={health} coins={coins - initialCoins} />
          <GameContainer style={{ flexDirection: 'row', width: '100%' }}>
            <GameButton onPress={playRound} disabled={isShootButtonDisabled}>
              <TextGameButton>Disparar</TextGameButton>
            </GameButton>
            <GameButton onPress={withdraw} disabled={isResetButtonDisabled}>
              <TextGameButton>Retirarse</TextGameButton>
            </GameButton>
          </GameContainer>
          <View style={{ ...stylesRoulette.containerMessages, width: '100%' }}>
            <Text style={stylesRoulette.containerMessagesText}>{message}</Text>
          </View>
        </View>
      )}
      {gameState === 'gameOver' && (
        <GameContainer>
          <Text style={styles.gameOverMessage}>Fin del Juego</Text>
          <GameText>{message}</GameText>
          <GameText>Has perdido toda tu apuesta.</GameText>
          <GameText>
            Balance: {coins - initialCoins > 0 ? `+${coins - initialCoins}` : coins - initialCoins}
          </GameText>
          <ResetButton onPress={resetGame}>
            <TextGameButton>Reiniciar</TextGameButton>
          </ResetButton>
        </GameContainer>
      )}
      {gameState === 'goodEnding' && (
        <GameContainer>
          <Text style={styles.gameOverMessage}>
            {coins - initialCoins > 0 ? '¡Felicidades!' : '¡Mala suerte!'}
          </Text>
          <GameText>{message}</GameText>
          <GameText>Turnos jugados: {turns}</GameText>
          <GameText>Salud restante: {health}</GameText>
          <GameText>
            Balance: {coins - initialCoins > 0 ? `+${coins - initialCoins}` : coins - initialCoins}
          </GameText>
          <ResetButton onPress={resetGame}>
            <TextGameButton>Reiniciar</TextGameButton>
          </ResetButton>
        </GameContainer>
      )}
    </View>
  );
};

export default Game;
