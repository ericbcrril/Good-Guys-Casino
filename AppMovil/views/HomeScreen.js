//HomeScreen.js
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
//Componentes 
import { WhiteBox, WhiteBoxText, WhiteBoxTitle, WhiteBoxLink } from "../components/misc/components";
//Estilos
import { styles } from "../assets/styles/styles";

export default function App() {
  return (
    <View style={styles.main}>
      <WhiteBox>
        <WhiteBoxTitle>Este es el titulo</WhiteBoxTitle>
        <WhiteBoxText>Esta es nuestra caja blanca</WhiteBoxText>
      </WhiteBox>
      <StatusBar style="auto" />
    </View>
  );
}
