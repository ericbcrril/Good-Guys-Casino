// HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//Componentes 
import { WhiteBox, WhiteBoxText, WhiteBoxTitle, WhiteBoxLink, WhiteBoxButton, NavBar } from "components/misc/components";
import { PurpleButton, ButtonText } from 'components/forms/formComponents';
import { UserIcon } from 'components/home/homeComponents';
//Estilos
import { styles } from "assets/styles/styles";
import { home } from "assets/styles/home";
//Imagenes
const logoGG = require('assets/images/logos/logoGG.png');
const theTest = require('assets/images/test.png');

export default function HomeScreen() {
  
  const navigation = useNavigation();

  const handlePlayGame = (gameType) => {
    navigation.navigate('MinigameScreen', { gameType });
  };

  return (
    <ScrollView style={styles.mainHome}>
     
    <View>
    <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
        <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
        <View>
        <WhiteBoxTitle>Ruleta Rusa</WhiteBoxTitle>
        <WhiteBoxText>Prueba tu suerte</WhiteBoxText>
        <PurpleButton style={{width: 100, left: 115}} onPress={() => handlePlayGame('russianRoulette')}><ButtonText>Jugar</ButtonText></PurpleButton>
        </View>
      </WhiteBox>
      
      <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
        <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
        <View>
        <WhiteBoxTitle>Ruleta Americana</WhiteBoxTitle>
        <WhiteBoxText>Juego tipico en Casinos</WhiteBoxText>
        <PurpleButton style={{width: 100, left: 115}} onPress={() => alert("Juego en desarrollo")}><ButtonText>Jugar</ButtonText></PurpleButton>
        </View>
      </WhiteBox>

      <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
        <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
        <View>
        <WhiteBoxTitle>BlackJack</WhiteBoxTitle>
        <WhiteBoxText>Desafia al Crupier</WhiteBoxText>
        <PurpleButton style={{width: 100, left: 115}} onPress={() => handlePlayGame('blackjack')}><ButtonText>Jugar</ButtonText></PurpleButton>
        </View>
      </WhiteBox>

      <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
        <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
        <View>
        <WhiteBoxTitle>Minijuego 4</WhiteBoxTitle>
        <WhiteBoxText>¡Diviertete!</WhiteBoxText>
        <PurpleButton style={{width: 100, left: 115}} onPress={() => alert("Juego en desarrollo")}><ButtonText>Jugar</ButtonText></PurpleButton>
        </View>
      </WhiteBox>
    </View>

    </ScrollView>
  );
}
