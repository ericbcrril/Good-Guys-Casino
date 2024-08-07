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
    const fetchData = async () => {
      const data = await loadUserData();
      setUserData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userData && userData.wallet) {
      // Ejecutar la acción cuando `userData.wallet.totalggp` cambie
      console.log('totalggp ha cambiado:', userData.wallet.totalggp);

      // Aquí puedes realizar cualquier otra acción que necesites
    }
  }, [userData?.wallet?.totalggp]); // Dependencia en `userData.wallet.totalggp`

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
