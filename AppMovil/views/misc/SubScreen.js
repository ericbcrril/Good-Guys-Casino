import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//Componentes
import { TitleSreen } from '../../components/misc/components';

export default function SubScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { screen } = route.params;
  

  const handleNavigate = () => {
    navigation.navigate('App');
  };
  // Aquí puedes usar screen para decidir qué contenido renderizar
  // Por ejemplo:
  let screenContent;

  switch (screen) {
    case 'help':
      screenContent = <Text>Ayuda</Text>;
      break;
    case 'balanceReport':
      screenContent = <Text>Informe de Balance</Text>;
      break;
    case 'buyPoints':
        screenContent = <Text>Comprar puntos</Text>;
        break;
    case 'payment':
            screenContent = <Text>Metodos de pago</Text>;
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
