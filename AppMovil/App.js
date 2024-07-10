import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Componentes
import { View, ActivityIndicator } from 'react-native';
import { Logo } from './components/misc/components';
//Estilos
import { styles } from "./assets/styles/styles";
//Imagenes 
const logoGG = require('./assets/images/logos/logoGG.png');
const logoGgAnimated = require('./assets/images/logos/logoGgAnimated.gif');
//Vistas
import AppScreen from './views/minigames/rouletteScreen';
import LoginScreen from './views/login/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

  // Suponiendo que aquí realizas alguna lógica para verificar la sesión del usuario, por ejemplo, con AsyncStorage o un servicio de autenticación
  useEffect(() => {
    // Simulando una verificación de sesión al inicio de la aplicación
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true); // Cambiar a true si se detecta una sesión iniciada
    }, 2000); // Simulación de carga durante 2 segundos
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
          <Stack.Screen name="App" component={AppScreen} options={{ headerShown: false }}/>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
