import React, { useState, useEffect, useRef } from 'react';
import { Text, Animated, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from "assets/styles/styles";
import HomeScreen from "./menus/HomeScreen";
import SelectGameScreen from './menus/SelectGameScreen';
import SettingsScreen from './menus/SettingsScreen';
import { UserIcon } from 'components/home/homeComponents';
import loadUserData from '../scripts/user/loadUserData';

// Imagenes
const logoGG = require('assets/images/logos/logoGG.png');
const theTest = require('assets/images/test.png');

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

const AnimatedScreen = ({ currentScreen, previousScreen, userData }) => {
  const translateYAnimNew = useRef(new Animated.Value(100)).current;
  const translateYAnimOld = useRef(new Animated.Value(0)).current;
  const Home = () => <HomeScreen userData={userData}/>;
  const Minigames = () => <SelectGameScreen userData={userData}/>;
  const Settings = () => <SettingsScreen userData={userData}/>;

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
  const [userData, setUserData] = useState(null);
  const [totalggp, setTotalggp] = useState (0);
  const navigation = useNavigation();

  const handleSetScreen = (screen) => {
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);
  };

  const handleNavigate = (screen) => {
    navigation.navigate('SubScreen', { screen });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadUserData();
      setUserData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      setTotalggp(await AsyncStorage.getItem('userWallet'));
    }, 1000); // Actualiza el balance cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
      <View style={{ display: currentScreen === 'settings' ? 'none' : 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 10, marginTop: 35 }}>
        <TouchableOpacity onPress={() => handleNavigate('account')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <UserIcon source={theTest} />
          <Text>{userData?.user ? userData?.user:'Unknown'}</Text> 
        </TouchableOpacity>
        {currentScreen === 'minigames' && userData && (
          <Text>{totalggp ? totalggp:'00.00'} GGP</Text> 
        )}
      </View>
      <AnimatedScreen currentScreen={currentScreen} previousScreen={previousScreen} userData={userData}/>
      <NavBar setScreen={handleSetScreen} />
    </View>
  );
}
