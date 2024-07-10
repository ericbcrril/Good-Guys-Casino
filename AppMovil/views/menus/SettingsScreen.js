// HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
//Componentes 
import { WhiteBox, WhiteBoxText, WhiteBoxTitle, WhiteBoxLink, WhiteBoxButton, NavBar, Hr } from "../../components/misc/components";
import { UserIcon, OptionText } from '../../components/home/settingsComponents';
//Estilos
import { styles } from "assets/styles/settings";
import { home } from "assets/styles/home";
//Imagenes
const logoGG = require('assets/images/logos/logoGG.png');
const theTest = require('assets/images/test.png');


export default function SettingsScreen() {
  return (
      <ScrollView style={styles.main}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 35}}>
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
              <UserIcon source={theTest}/><Text style={{fontSize: 32}}>Usuario 1</Text></TouchableOpacity>
          </View>
          <Hr />
            <View style={{ alignItems: 'center' }}>
              <View>
              <Text style={{ color: '#F5FCFF' }}>-------------------------------------------------------------</Text>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Icon name="home" size={22} color="#000" style={{ marginLeft: 5 }} />
                  <OptionText>Inicio</OptionText>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="help" size={22} color="#000" style={{ marginLeft: 5 }} />
                  <OptionText>Ayuda</OptionText>
                </TouchableOpacity>                
              </View>
            </View>
          <Hr />
          <View style={{ alignItems: 'center' }}>
              <View>
              <Text style={{ color: '#F5FCFF' }}>-------------------------------------------------------------</Text>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="arrow-top-right" size={22} color="#000" style={{ marginLeft: 5 }} />
                <OptionText>Informe de Balance</OptionText>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="credit-card-multiple-outline" size={22} color="#000" style={{ marginLeft: 5 }} />
                <OptionText>Metodos de Pago</OptionText>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
                <Icon name="logout" size={22} color="#000" style={{ marginLeft: 5 }} />
                <OptionText>Cerrar Sesion</OptionText>
              </TouchableOpacity>
              </View>
          </View>
      </ScrollView>
  );
}
