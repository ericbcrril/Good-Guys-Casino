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
//Scritps
import { handleTransaction } from '../../scripts/transactions/handleTransactions';
//Usuario
import { userData } from '../../constants/simulateUser';

export default function HomeScreen() {
  
  const navigation = useNavigation();

  const handlePlayGame = (gameType) => {
    navigation.navigate('MinigameScreen', { gameType });
  };

  const handleBuy = async (userId, date, amount, reason) => {
    await handleTransaction(userId, date, amount, reason);
  }

  return (
    <ScrollView style={styles.mainHome}>
      <View>
        <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
          <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
          <View>
            <WhiteBoxTitle>150 GGP</WhiteBoxTitle>
            <PurpleButton 
              style={{width: 100, left: 100}} 
              onPress={() => handleBuy(userData.user, new Date(), 150.00, 'Compra de paquete 150 GGP')}
            >
              <ButtonText>80.00 $</ButtonText>
            </PurpleButton>
          </View>
        </WhiteBox>
        
        <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
          <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
          <View>
            <WhiteBoxTitle>500 GGP</WhiteBoxTitle>
            <PurpleButton 
              style={{width: 100, left: 100}} 
              onPress={() => handleBuy(userData.user, new Date(), 500.00, 'Compra de paquete 500 GGP')}
            >
              <ButtonText>215.00 $</ButtonText>
            </PurpleButton>
          </View>
        </WhiteBox>

        <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
          <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
          <View>
            <WhiteBoxTitle>1350 GGP</WhiteBoxTitle>
            <PurpleButton 
              style={{width: 100, left: 100}} 
              onPress={() => handleBuy(userData.user, new Date(), 1350.00, 'Compra de paquete 1350 GGP')}
            >
              <ButtonText>500.00 $</ButtonText>
            </PurpleButton>
          </View>
        </WhiteBox>

        <WhiteBox style={{ width: '95%', flexDirection: 'row' }}>
          <Image source={theTest} style={{width: 100, height: 100, marginRight: 10}}/>
          <View>
            <WhiteBoxTitle>2500 GGP</WhiteBoxTitle>
            <PurpleButton 
              style={{width: 100, left: 100}} 
              onPress={() => handleBuy(userData.user, new Date(), 2500.00, 'Compra de paquete 2500 GGP')}
            >
              <ButtonText>1200.00 $</ButtonText>
            </PurpleButton>
          </View>
        </WhiteBox>
      </View>
    </ScrollView>
  );
}
