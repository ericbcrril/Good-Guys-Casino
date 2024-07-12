import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// Componentes 
import HomeScreen from "./HomeScreen";
import MinigamesScreen from './MinigamesScreen';
import SettingsScreen from './SettingsScreen';
import Roulette from './CasinoRoulette';
// Estilos
import { styles } from "../assets/styles/styles";
// Imagenes
const logoGG = require('../assets/images/logos/logoGG.png');

const Home = () => (
  <HomeScreen />
);

const Minigames = () => (
  <MinigamesScreen />
);

const Settings = () => (
  <SettingsScreen />
);



const NavBar = ({ setScreen }) => (
  <View style={styles.navBar}>
    <TouchableOpacity style={styles.navItem} onPress={() => setScreen('home')}>
      <Icon name="home-sharp" size={32} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => setScreen('minigames')}>
      <Icon name="game-controller-sharp" size={32} color="#fff" />
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={() => setScreen('settings')}>
      <Icon name="settings" size={32} color="#fff" />
    </TouchableOpacity>
    
  </View>
);

export default function AppScreen() {
  const [currentScreen, setCurrentScreen] = useState('home');

  let ScreenComponent;
  if (currentScreen === 'home') {
    ScreenComponent = Home;
  } else if (currentScreen === 'minigames') {
    ScreenComponent = Minigames;
  } else if (currentScreen === 'settings') {
    ScreenComponent = Settings;
  }

  return (
    <View style={{ flex: 1 }}>
      <ScreenComponent />
      <NavBar setScreen={setCurrentScreen} />
    </View>
  );
}
