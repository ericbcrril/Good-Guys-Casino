import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { Logo } from './components/misc/components';
import { styles } from "./assets/styles/styles";
const logoGG = require('./assets/images/logos/logoGG.png');
const logoGgAnimated = require('./assets/images/logos/logoGgAnimated.gif');
//Componentes
import AppScreen from './views/AppScreen';
import MinigameScreen from './views/minigames/minigameScreen';
import SubScreen from './views/misc/SubScreen';
import LoginScreen from './views/login/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.main}>
        <Logo source={logoGgAnimated} resizeMode='contain'/>
        <ActivityIndicator size="large" color='#831675' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="MinigameScreen" component={MinigameScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="SubScreen" component={SubScreen} options={{ headerShown: false }}/>
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
