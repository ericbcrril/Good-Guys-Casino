import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//MiniJuegos
import RouletteScreen from './rouletteScreen';
import BlackJackScreen from './blackjackScreen';
//Scripts
import loadUserData from '../../scripts/user/loadUserData';
import {updateGGP, getItems} from '../../constants/APIs/apis';

export default function GameScreen() {
  const route = useRoute();
  const [userData, setUserData] = useState(null);
  const { gameType } = route.params;

  async function updatePoints(ggp){
    await AsyncStorage.setItem('userWallet', String(ggp));
    await updateGGP(userData.id, ggp);
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadUserData();
      setUserData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userData && userData.wallet) {
      // Ejecutar la acción cuando `userData.wallet.totalggp` cambie
      console.log('totalggp ha cambiado:', userData.wallet.totalggp);
      updatePoints(userData.wallet.totalggp);
    }
  }, [userData?.wallet?.totalggp]); // Dependencia en `userData.wallet.totalggp`

  const updateTotalGgp = (newTotalGgp) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      wallet: {
        ...prevUserData.wallet,
        totalggp: newTotalGgp,
      },
    }));
  };
  
  // Aquí puedes usar gameType para decidir qué contenido renderizar
  // Por ejemplo:
  let gameContent;

  switch (gameType) {
    case 'russianRoulette':
      gameContent = <RouletteScreen userData={userData} updateTotalGgp={updateTotalGgp}/>;
      break;
    case 'blackjack':
      gameContent = <BlackJackScreen userData={userData} updateTotalGgp={updateTotalGgp}/>
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
