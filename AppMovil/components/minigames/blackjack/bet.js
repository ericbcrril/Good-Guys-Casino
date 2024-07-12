import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GameContainer, GameButton, TextGameButton, GameTextInput, GameTitle, ResetButton } from 'components/minigames/components';
import { styles } from 'assets/styles/minigames/styles';

const Bet = ({ onBet, coins }) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('20'); // Inicializado como string para el TextInput
  const balance = coins;

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
    onBet(betAmount);
  };

  const handleExit = () => {
    navigation.navigate('App');
  };

  return (
    <GameContainer>
      <GameTitle style={styles.gameTitle}>Blackjack</GameTitle>
      <View style={styles.betForm}>
        <Text style={styles.betLabel}>Cantidad a apostar:</Text>
        <GameTextInput
          style={styles.betInput}
          keyboardType="numeric"
          value={amount}
          onChangeText={(value) => {
            if (/^\d*$/.test(value)) { // Solo números positivos o vacío
              setAmount(value);
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
