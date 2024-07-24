import React, { useState, useEffect, useRef } from 'react';
import { Text, Animated, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
// Componentes 
import HomeScreen from "./menus/HomeScreen";
import SelectGameScreen from './menus/SelectGameScreen';
import SettingsScreen from './menus/SettingsScreen';
import { UserIcon } from 'components/home/homeComponents';
// Estilos
import { styles } from "assets/styles/styles";
//Usuario
import { userData, movementsData } from '../constants/simulateUser';
// Imagenes
const logoGG = require('assets/images/logos/logoGG.png');
const theTest = require('assets/images/test.png');

const Home = () => (
  <HomeScreen />
);

const Minigames = () => (
  <SelectGameScreen />
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
      <Icon name="menu" size={32} color="#fff" />
    </TouchableOpacity>
    
  </View>
);

const AnimatedScreen = ({ currentScreen, previousScreen }) => {
  const translateYAnimNew = useRef(new Animated.Value(100)).current;
  const translateYAnimOld = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    translateYAnimNew.setValue(800); // Reset the new component position
    translateYAnimOld.setValue(0); // Reset the old component position

    Animated.parallel([
      Animated.timing(translateYAnimNew, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnimOld, {
        toValue: 500,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentScreen]);

  let CurrentComponent, PreviousComponent;
  if (currentScreen === 'home') {
    CurrentComponent = Home;
  } else if (currentScreen === 'minigames') {
    CurrentComponent = Minigames;
  } else if (currentScreen === 'settings') {
    CurrentComponent = Settings;
  }

  if (previousScreen === 'home') {
    PreviousComponent = Home;
  } else if (previousScreen === 'minigames') {
    PreviousComponent = Minigames;
  } else if (previousScreen === 'settings') {
    PreviousComponent = Settings;
  }

  return (
    <View style={{ flex: 1 }}>
      {previousScreen && (
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, transform: [{ translateY: translateYAnimOld }] }}>
          <PreviousComponent />
        </Animated.View>
      )}
      <Animated.View style={{ flex: 1, transform: [{ translateY: translateYAnimNew }] }}>
        <CurrentComponent />
      </Animated.View>
    </View>
  );
};

export default function AppScreen() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [previousScreen, setPreviousScreen] = useState(null);
  const navigation = useNavigation();

   const handleSetScreen = (screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const handleNavigate = (screen) => {
    navigation.navigate('SubScreen', { screen });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
          <View style={{ display: currentScreen === 'settings' ? 'none' : 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, marginTop: 35}}>
            <TouchableOpacity onPress={() => handleNavigate('account')} style={{flexDirection: 'row', alignItems: 'center'}}>
              <UserIcon source={theTest}/><Text>{ userData.user }</Text>
            </TouchableOpacity>
            <Text style={{ display: currentScreen == 'minigames' ? 'flex' : 'none'}}>{ userData.wallet.totalgg } GGP</Text>
          </View>
        <AnimatedScreen currentScreen={currentScreen} previousScreen={previousScreen} />
        <NavBar setScreen={handleSetScreen} />
    </View>
  );
}
