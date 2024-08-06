import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
//MiniJuegos
import RouletteScreen from './rouletteScreen';
import BlackJackScreen from './blackjackScreen';
//Scripts
import loadUserData from '../../scripts/user/loadUserData';

export default function GameScreen() {
  const route = useRoute();
  const [userData, setUserData] = useState(null);
  const { gameType } = route.params;

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await loadUserData();
      setUserData(data);
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  // Aquí puedes usar gameType para decidir qué contenido renderizar
  // Por ejemplo:
  let gameContent;

  switch (gameType) {
    case 'russianRoulette':
      gameContent = <RouletteScreen userData={userData}/>;
      break;
    case 'blackjack':
      gameContent = <BlackJackScreen userData={userData}/>
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
