import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useState,  useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//Componentes
import { TitleSreen } from '../../components/misc/components';
import HelpScreen from './helpScreen';
import BalanceReport from './balanceReportScreen';
import BuyGGPoints from './buyGGPointsScreen';
import AccountScreen from './accountScreen';
import PaymentScreen from './paymentScreen';
//Scripts
import loadUserData from '../../scripts/user/loadUserData';

export default function SubScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [userData, setUserData] = useState(null);
  const { screen } = route.params;
  

  const handleNavigate = () => {
    navigation.navigate('App');
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await loadUserData();
      setUserData(data);
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  // Aquí puedes usar screen para decidir qué contenido renderizar
  let screenContent;

  switch (screen) {
    case 'help':
      screenContent = <HelpScreen/>;
      break;
    case 'balanceReport':
      screenContent = <BalanceReport/>;
      break;
    case 'buyPoints':
        screenContent = <BuyGGPoints/>;
        break;
    case 'account':
            screenContent = <AccountScreen userData={userData}/>;
        break;
    case 'payment':
            screenContent = <PaymentScreen/>;
        break;
    // Agrega más casos según sea necesario
    default:
      screenContent = <Text>Aqui renderizamos pantallas secundarias</Text>;
  }

  return (
    <View style={{flex: 1}}>
        <TitleSreen><TouchableOpacity onPress={() => handleNavigate()} style={{margin: '2%', flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name='keyboard-backspace' color='#000'size={22}/><Text style={{marginLeft: 5}}>Regresar</Text>
        </TouchableOpacity></TitleSreen>
        {screenContent}
    </View>
  );
}
