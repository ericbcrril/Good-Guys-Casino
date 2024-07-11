import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GameContainer, GameButton, TextGameButton, GameTextInput, GameTitle, ResetButton } from 'components/minigames/roulette/components';
import { styles } from 'assets/styles/minigames/styles';

const Bet = ({ onBet, coins }) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('20'); // Inicializado como string para el TextInput
  const [multiplier, setMultiplier] = useState(1);
  const balance = coins; // Suponiendo que coins representa el balance del jugador

  const handleSubmit = () => {
    const betAmount = Number(amount);
    if (betAmount < 20) {
      alert('La apuesta mínima es 20.');
      return;
    }
    if (betAmount > balance) {
      alert('No tienes suficiente saldo para esta apuesta.');
      return;
    }
    onBet(betAmount, multiplier);
  };

  const handleExit = () => {
    navigation.navigate('App');
  }

  return (
    <GameContainer>
      <GameTitle style={styles.gameTitle}>Ruleta Rusa</GameTitle>
      <View style={styles.betForm}>
        <Text style={styles.betLabel}>Cantidad a apostar:</Text>
        <GameTextInput
          style={styles.betInput}
          keyboardType="numeric"
          value={amount}
          onChangeText={(value) => {
            // Validar y actualizar el valor solo si es numérico y cumple con las reglas
            if (/^\d+$/.test(value) || value === '') { // Solo números positivos o vacío
              const numericValue = value === '' ? '' : value; // Manejo para el valor vacío
              setAmount(numericValue);
            }
          }}
        />
        <GameButton onPress={handleSubmit}>
          <TextGameButton>Apostar</TextGameButton>
        </GameButton>
        <ResetButton onPress={handleExit}>
          <TextGameButton>Salir</TextGameButton>
        </ResetButton>
      </View>
    </GameContainer>
  );
};

export default Bet;
