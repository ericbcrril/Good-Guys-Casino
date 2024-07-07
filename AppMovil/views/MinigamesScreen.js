// HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
//Componentes 
import { WhiteBox, WhiteBoxText, WhiteBoxTitle, WhiteBoxLink, WhiteBoxButton, NavBar } from "../components/misc/components";
import { LoginButton, ButtonText } from '../components/forms/formComponents';
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

    <View>
    <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
        <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
        <View>
        <WhiteBoxTitle>Ruleta Rusa</WhiteBoxTitle>
        <WhiteBoxText>Prueba tu suerte</WhiteBoxText>
        <LoginButton style={{width: 100, left: 115}}><ButtonText>Jugar</ButtonText></LoginButton>
        </View>
      </WhiteBox>
      
      <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
        <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
        <View>
        <WhiteBoxTitle>Ruleta Americana</WhiteBoxTitle>
        <WhiteBoxText>Juego tipico en Casinos</WhiteBoxText>
        <LoginButton style={{width: 100, left: 115}}><ButtonText>Jugar</ButtonText></LoginButton>
        </View>
      </WhiteBox>

      <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
        <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
        <View>
        <WhiteBoxTitle>BlackJack</WhiteBoxTitle>
        <WhiteBoxText>Desafia al Crupier</WhiteBoxText>
        <LoginButton style={{width: 100, left: 115}}><ButtonText>Jugar</ButtonText></LoginButton>
        </View>
      </WhiteBox>

      <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
        <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
        <View>
        <WhiteBoxTitle>Minijuego 4</WhiteBoxTitle>
        <WhiteBoxText>¡Diviertete!</WhiteBoxText>
        <LoginButton style={{width: 100, left: 115}}><ButtonText>Jugar</ButtonText></LoginButton>
        </View>
      </WhiteBox>
    </View>

    </ScrollView>
  );
}
