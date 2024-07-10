import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
//Estilos
import { styles } from 'assets/styles/minigames/styles';
import { stylesRoulette } from 'assets/styles/minigames/roulette';
//Componentes
import { GameText, GameContainer, ButtonText, GameButton, TextGameButton, GameTextInput, GameTitle, ResetButton } from 'components/minigames/roulette/components';
import Bet from './bet';
import GunSelection from './gunSelection';
import StatusBar from './statusBar';
// Importa los efectos de sonido según sea necesario en React Native

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
  const [isResetButtonDisabled, setResetButtonDisabled] = useState(true); // Estado para manejar la desactivación del botón reiniciar

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

  return (
    <View>
      {gameState === 'betting' && <Bet onBet={handleBet} coins={coins} />}
      {gameState === 'gunSelection' && <GunSelection onSelectGun={handleGunSelection} />}
      {gameState === 'playing' && (
        <View style={stylesRoulette.gameActions}>
          <StatusBar health={health} coins={coins - initialCoins} />
          <GameContainer style={{ flexDirection: 'row', width: '100%' }}>
            <GameButton onPress={playRound} disabled={isShootButtonDisabled} >
              <TextGameButton>Disparar</TextGameButton>
            </GameButton>
            <GameButton onPress={withdraw} disabled={isResetButtonDisabled} >
              <TextGameButton>Retirarse</TextGameButton>
            </GameButton>
          </GameContainer>
          <View style={{ ...stylesRoulette.containerMessages, width: '100%'}}>
            <Text style={stylesRoulette.containerMessagesText}>{message}</Text>
          </View>
        </View>
      )}
      {gameState === 'gameOver' && (
        <GameContainer>
          <Text style={styles.gameOverMessage}>Fin del Juego</Text>
          <GameText>{message}</GameText>
          <GameText >Has perdido toda tu apuesta.</GameText>
          <GameText >Balance: {coins - initialCoins > 0 ? `+${coins - initialCoins}` : coins - initialCoins}</GameText>
          <ResetButton  onPress={resetGame}><TextGameButton>Reiniciar</TextGameButton></ResetButton>
        </GameContainer>
      )}
      {gameState === 'goodEnding' && (
        <GameContainer>
          <Text style={styles.gameOverMessage}>{coins - initialCoins > 0 ? '¡Felicidades!' : '¡Mala suerte!'}</Text>
          <GameText >{message}</GameText>
          <GameText >Turnos jugados: {turns}</GameText>
          <GameText >Salud restante: {health}</GameText>
          <GameText >Balance: {coins - initialCoins > 0 ? `+${coins - initialCoins}` : coins - initialCoins}</GameText>
          <ResetButton  onPress={resetGame}><TextGameButton>Reiniciar</TextGameButton></ResetButton>
        </GameContainer>
      )}
    </View>
  );
};

export default Game;
