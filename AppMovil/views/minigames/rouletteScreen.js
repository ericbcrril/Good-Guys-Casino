import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import Game from 'components/minigames/roulette/game';
import { useFonts } from '@expo-google-fonts/press-start-2p';
import { styles } from 'assets/styles/minigames/styles';
import useScreenShake from 'assets/effects/shake'; // Ajusta la ruta según tu estructura de proyecto
import { userData } from '../../constants/simulateUser'; 

const App = () => {
  const [coins, setCoins] = useState(userData.balance);
  const { screenShake, setScreenShake, shakeAnimation } = useScreenShake();
  const [fontsLoaded] = useFonts({
    'PressStart2P': require('assets/fonts/PressStart2P-Regular.ttf'),
  });

  useEffect(() => {
    userData.balance = coins;
  }, [coins]);

  if (!fontsLoaded) {
    return null; // o cualquier componente de carga
  }

  return (
    <View style={styles.container}>
      <Text style={styles.balanceBox}>Balance: {coins}</Text>
      <Animated.View
        style={{
          transform: [{ translateX: shakeAnimation }],
        }}
      >
        <Game setScreenShake={setScreenShake} coins={coins} setCoins={setCoins} />
      </Animated.View>
    </View>
  );
};

export default App;
