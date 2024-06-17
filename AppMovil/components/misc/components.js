import { ImageBackground } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';

const Logo = styled(Image)({
  width: 180,
  height: 180,
  marginBottom: 20,
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

  export {WhiteBox, WhiteBoxTitle, WhiteBoxText, WhiteBoxLink, Logo };