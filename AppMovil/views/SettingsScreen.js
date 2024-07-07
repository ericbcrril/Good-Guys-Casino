// HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, Image, StyleSheet } from 'react-native';
//Componentes 
import { WhiteBox, WhiteBoxText, WhiteBoxTitle, WhiteBoxLink, WhiteBoxButton, NavBar } from "../components/misc/components";
import { UserIcon } from '../components/home/homeComponents';
//Estilos
import { styles } from "../assets/styles/styles";
import { home } from "../assets/styles/home";
//Imagenes
const logoGG = require('../assets/images/logos/logoGG.png');

export default function SettingsScreen() {
  return (
      <ScrollView style={styles.mainHome}>
          <Text>Esta es nuestra pestaña de Opciones.</Text>
      </ScrollView>
  );
}
