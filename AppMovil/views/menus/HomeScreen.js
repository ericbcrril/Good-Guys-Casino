// HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Linking } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//Componentes 
import { WhiteBox, WhiteBoxText, WhiteBoxTitle, WhiteBoxLink, WhiteBoxButton, NavBar } from "components/misc/components";
import { UserIcon } from 'components/home/homeComponents';
//Estilos
import { styles } from "assets/styles/styles";
import { stylesbalanceReport } from "assets/styles/balanceReport";
import { home } from "assets/styles/home";
//Imagenes
const logoGG = require('assets/images/logos/logoGG.png');
const theTest = require('assets/images/test.png');
//Usuario
import { movementsData } from '../../constants/simulateUser';
//Scripts
import loadUserMovements from '../../scripts/user/loadUserMovements';

export default function HomeScreen({userData}) {
  const navigation = useNavigation();
  const [totalggp, setTotalggp] = useState(0);
  const [userMovements, setmovementsData] = useState(movementsData)

  useEffect(() => {
    fetchData = async() => {
      setTotalggp(await AsyncStorage.getItem('userWallet'));
      setmovementsData(await loadUserMovements());
    }
    fetchData();
  }, []);

  const handleNavigate = (screen) => {
    navigation.navigate('SubScreen', { screen });
  };

  const openWebPage = () => {
    const url = 'http://192.168.1.72:3000/main'; // Reemplaza con tu URL
    Linking.openURL(url).catch((err) => console.error('Error al abrir la URL:', err));
};


  return (
      <ScrollView style={styles.mainHome}>
        <WhiteBox style={{ width: '95%' }}>
    <WhiteBoxTitle>Balance</WhiteBoxTitle>
    <View style={home.balanceBox}>
      <View style={home.balanceBoxContainer}>
        <WhiteBoxTitle>{totalggp ? totalggp : '00.00' } GGP</WhiteBoxTitle>
      </View> 
      <View style={home.balanceBoxContainerActions}>
        <WhiteBoxButton onPress={() => handleNavigate('buyPoints')} style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{width: 50}} numberOfLines={1}>Ingresar</Text>
          <Icon name="import" size={20} color="#000" style={{ marginLeft: 5 }} />
        </WhiteBoxButton>
        <WhiteBoxButton onPress={() => handleNavigate('payment')} style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{width: 50}} numberOfLines={1}>Retirar</Text>
          <Icon name="export" size={20} color="#000" style={{ marginLeft: 5 }} />
        </WhiteBoxButton>
      </View>
    </View>
  </WhiteBox>

        <WhiteBox style={{width: '95%'}}>
          <WhiteBoxTitle>Informe de Balance</WhiteBoxTitle>
          {userMovements.slice(-5).reverse().map((movement, index) => (
            <View key={index} style={stylesbalanceReport.transaction}>
              <Text numberOfLines={1} style={movement.totalggp > 0 ? stylesbalanceReport.positive : stylesbalanceReport.negative}>
                {movement.totalggp > 0 ? '+' : ''}{movement.totalggp}
              </Text>
              <Text numberOfLines={1} style={stylesbalanceReport.details}>
                {movement.date} - {movement.reason}
              </Text>
            </View>
          ))}
          <WhiteBoxLink onPress={() => handleNavigate('balanceReport')} 
                        style={{left: '75%'}}>Ver mas..</WhiteBoxLink>
        </WhiteBox>

        <WhiteBox style={{width: '95%'}}>
          <WhiteBoxTitle>Visita nuestra Web</WhiteBoxTitle>
          <Text>No olvides darte una vuelta por nuestra web para ganar recompensas.</Text>
          <WhiteBoxLink onPress={() => openWebPage() } 
                        style={{left: '75%'}}>Click Aquí</WhiteBoxLink>
        </WhiteBox>

      </ScrollView>
  );
}
