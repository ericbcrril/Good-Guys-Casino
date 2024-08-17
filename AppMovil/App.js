import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
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
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    // Comprobar la conexión a internet
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //#region Verificar Token
  async function verifiLogin() {
    const accesToken = await AsyncStorage.getItem('userToken');
    if(accesToken){
      const response = await axios.get(`http://192.168.1.72:5000/api/accounts/validateToken/${accesToken}`);
      if(response.data.isValid){
        setIsLoggedIn(true);
        setIsLoading(false);
      }else if(!response.data.isValid){ 
        await AsyncStorage.clear();
        setIsLoggedIn(false);
        setIsLoading(false);
        alert('Tu Sesion ah expirado, vuelve a Iniciar Sesion');
      }
    }else{
      console.log('No se ah iniciado sesion')
      setIsLoading(false);
    }
  }

  verifiLogin();

  if (isLoading) {
    return (
      <View style={styles.main}>
        <Logo source={logoGgAnimated} resizeMode='contain'/>
        <ActivityIndicator size="large" color='#831675' />
      </View>
    );
  }

  if (!isConnected) {
    return (
      <View style={styles.main}>
        <Text>No hay conexión a internet</Text>
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
            <Stack.Screen name="Login" initialParams={{setIsLoggedIn}} component={LoginScreen} options={{ headerShown: false }}/>
          </>
        ) : (
          <Stack.Screen name="Login" initialParams={{setIsLoggedIn}} component={LoginScreen} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
