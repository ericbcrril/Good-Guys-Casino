import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
//MiniJuegos
import RouletteScreen from './rouletteScreen';
import BlackJackScreen from './blackjackScreen';


export default function GameScreen() {
  const route = useRoute();
  const { gameType } = route.params;

  // Aquí puedes usar gameType para decidir qué contenido renderizar
  // Por ejemplo:
  let gameContent;

  switch (gameType) {
    case 'russianRoulette':
      gameContent = <RouletteScreen />;
      break;
    case 'blackjack':
      gameContent = <BlackJackScreen />
      break;
    // Agrega más casos según sea necesario
    default:
      gameContent = <Text>Selecciona un juego para comenzar</Text>;
  }

  return (
    <View style={{flex: 1}}>
        {gameContent}
    </View>
  );
}
