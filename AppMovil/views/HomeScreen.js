// HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
//Componentes 
import { WhiteBox, WhiteBoxText, WhiteBoxTitle, WhiteBoxLink, WhiteBoxButton, NavBar } from "../components/misc/components";
import { UserIcon } from '../components/home/homeComponents';
//Estilos
import { styles } from "../assets/styles/styles";
import { home } from "../assets/styles/home";
//Imagenes
const logoGG = require('../assets/images/logos/logoGG.png');
const theTest = require('../assets/images/test.png');

export default function HomeScreen() {
  return (
      <ScrollView style={styles.mainHome}>

        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}><UserIcon source={theTest}/><Text>Usuario 1</Text></TouchableOpacity>
        </View>

        <WhiteBox style={{ width: '95%' }}>
    <WhiteBoxTitle>Balance</WhiteBoxTitle>
    <View style={home.balanceBox}>
      <View style={home.balanceBoxContainer}>
        <WhiteBoxTitle>$234.00</WhiteBoxTitle>
      </View>
      <View style={home.balanceBoxContainerActions}>
        <WhiteBoxButton style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{width: 50}}>Ingresar</Text>
          <Icon name="import" size={20} color="#000" style={{ marginLeft: 5 }} />
        </WhiteBoxButton>
        <WhiteBoxButton style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{width: 50}}>Retirar</Text>
          <Icon name="export" size={20} color="#000" style={{ marginLeft: 5 }} />
        </WhiteBoxButton>
      </View>
    </View>
  </WhiteBox>

        <WhiteBox style={{width: '95%'}}>
          <WhiteBoxTitle>Informe de Balance</WhiteBoxTitle>
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
            <View>
              <Text style={{color: 'green'}}>+ 350.00</Text>
              <Text style={{color: 'red'}}>+ 350.00</Text>
              <Text style={{color: 'green'}}>+ 350.00</Text>
            </View>
            <View>
              <Text>Jugando Ruleta Americana</Text>
              <Text>Jugando BlackJack</Text>
              <Text>Depositó en la App</Text>
            </View>
          </View>
        </WhiteBox>

      </ScrollView>
  );
}
