import React, { useState, useEffect } from 'react';
import { Text, Animated, View, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // o 'react-native-linear-gradient' si no estás usando Expo
import Game from 'components/minigames/blackjack/game';
import { useFonts } from '@expo-google-fonts/press-start-2p';
import { styles } from 'assets/styles/minigames/styles';
import { stylesBlackjack } from 'assets/styles/minigames/blackjack';

const App = ({userData}) => {
    const [coins, setCoins] = useState(0); // Monedas o Balance

    useEffect(() => {
      if(userData){
        setCoins(userData.wallet.totalggp);
      }
    }, [userData]);

    const [fontsLoaded] = useFonts({
        'PressStart2P': require('assets/fonts/PressStart2P-Regular.ttf'),
      });
    
      if (!fontsLoaded) {
        return null; // o cualquier componente de carga
      }

    return (
      <LinearGradient colors={['rgba(0,74,23,1)', 'rgba(0,125,39,1)', 'rgba(0,74,23,1)']}
      style={stylesBlackjack.container}>
      <Text style={styles.balanceBox} className='balance-box'>Balance: {coins}</Text>
      <View style={stylesBlackjack.cardsContainer}>
        <Game coins={coins} setCoins={setCoins} />
      </View>
    </LinearGradient>
    );
};

export default App;
