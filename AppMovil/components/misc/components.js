import { ImageBackground } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';
//Estilos
import { styles } from "assets/styles/styles";

const Logo = styled(Image)({
  width: 250,
  height: 250,
  marginBottom: 20,
});

const Hr = styled(View)({
    height: 1,
    backgroundColor: '#CED0CE',
    marginVertical: 10,
});

const TitleSreen = styled(View)({
    display: 'flex',
    width: '100%',
    paddingTop: '10%',
    justifyContent: 'center',
    backgroundColor: 'white',
});

/*White Box es un view redondeado con sombra*/
const WhiteBox = styled(View)({
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'visible',
  });
  
  const WhiteBoxTitle = styled(Text)({
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  });
  
  const WhiteBoxText = styled(Text)({
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  });
  
  const WhiteBoxLink = styled(Text)({
    fontSize: 16,
    margin: 10,
    color: '#007bff',
  });

  const WhiteBoxButton = styled(TouchableOpacity)({
    backgroundColor: '#D9D9D9',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
});

  export {WhiteBox, WhiteBoxTitle, WhiteBoxText, WhiteBoxLink, WhiteBoxButton, Logo, Hr, TitleSreen };