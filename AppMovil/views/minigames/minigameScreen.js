import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
//MiniJuegos
import RouletteScreen from './rouletteScreen';

export default function GameScreen() {
  const route = useRoute();
  const { gameType } = route.params;
  console.log(gameType);

  // Aquí puedes usar gameType para decidir qué contenido renderizar
  // Por ejemplo:
  let gameContent;

  switch (gameType) {
    case 'russianRoulette':
      gameContent = <RouletteScreen />;
      break;
    case 'otroJuego':
      gameContent = <Text>Estás jugando a otro juego</Text>;
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
