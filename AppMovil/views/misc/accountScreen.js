import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
//Componentes
import { FormInput, PurpleButton, ButtonText, LabelForm } from '../../components/forms/formComponents';
import { Hr } from 'components/misc/components';
import { UserIcon, OptionText } from 'components/home/settingsComponents';
//Estilos
import { styles } from "assets/styles/styles";
// Imágenes 
const theTest = require('assets/images/test.png');

export default function AccountScreen({userData}) {
  const navigation = useNavigation();

  const handleNavigate = (screen) => {
    navigation.navigate('SubScreen', { screen });
  };

  return (
    <ScrollView style={styles.mainHome}>
      <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 10 }}>
        <TouchableOpacity>
            <UserIcon source={theTest} />
        </TouchableOpacity>
            <TextInput style={{ fontSize: 32 }}>{ userData ? userData.user:'Unknown' }</TextInput>
        <TouchableOpacity onPress={() => handleNavigate('buyPoints')}>
            <Text style={{ fontSize: 32 }}>{userData ? userData.wallet.totalggp:'00.00'} GGP</Text>
        </TouchableOpacity>
      </View>
      <Hr />
      <LabelForm style={{marginLeft: 15}}>Nombre y Apellido </LabelForm>
      <View style={{ alignItems: 'center', width: '60%', margin: '5%', marginLeft: '20%'}}>
            <FormInput placeholder='Nombre'>{userData ? userData.name:''}</FormInput>
            <FormInput placeholder='Apellido'>{userData ? userData.lastName:''}</FormInput>
      </View>
      <Hr />
      <View style={{ alignItems: 'center' }}>
            <LabelForm>Correo Electronico: </LabelForm>
            <Text style={{fontSize: 18}}>{userData ? userData.email:''}</Text>
            <PurpleButton><ButtonText>Guardar Cambios</ButtonText></PurpleButton>
      </View>
    </ScrollView>
  );
}
