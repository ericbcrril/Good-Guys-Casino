import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
//Componentes
import { Hr } from 'components/misc/components';
import { UserIcon, OptionText } from 'components/home/settingsComponents';
//Estilos
import { styles } from "assets/styles/settings";
// Imágenes (asegúrate de que las rutas estén correctamente definidas)
const theTest = require('assets/images/test.png');
//Usuario
import { userData, movementsData } from '../../constants/simulateUser';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate('SubScreen', { screen });
  };

  return (
    <ScrollView style={styles.main}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 10, marginTop: 35 }}>
        <TouchableOpacity onPress={() => handleNavigate('account')} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <UserIcon source={theTest} />
          <Text style={{ fontSize: 32 }}>{ userData.user }</Text>
        </TouchableOpacity>
      </View>
      <Hr />
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={{ color: '#F5FCFF' }}>------------------------------------------------------------------------</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => navigation.navigate('App')}>
            <Icon name="home" size={22} color="#000" style={{ marginLeft: 5 }} />
            <OptionText>Inicio</OptionText>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} 
                            onPress={() => handleNavigate('help')}>
            <Icon name="help" size={22} color="#000" style={{ marginLeft: 5 }} />
            <OptionText>Ayuda</OptionText>
          </TouchableOpacity>
        </View>
      </View>
      <Hr />
      <View style={{ alignItems: 'center' }}>
        <View>
          <Text style={{ color: '#F5FCFF' }}>------------------------------------------------------------------------</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => handleNavigate('balanceReport')}>
            <Icon name="arrow-top-right" size={22} color="#000" style={{ marginLeft: 5 }} />
            <OptionText>Informe de Balance</OptionText>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => handleNavigate('buyPoints')}>
            <IconFontAwesome5 name="coins" size={22} color="#000" style={{ marginLeft: 5 }} />
            <OptionText>Good Guys Points (GGP)</OptionText>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => handleNavigate('payment')}>
            <Icon name="credit-card-multiple-outline" size={22} color="#000" style={{ marginLeft: 5 }} />
            <OptionText>Metodos de Pago</OptionText>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="logout" size={22} color="#000" style={{ marginLeft: 5 }} />
            <OptionText>Cerrar Sesion</OptionText>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
