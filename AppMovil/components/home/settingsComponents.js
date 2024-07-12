import { ImageBackground } from 'react-native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';

const UserIcon = styled(Image)({
  width: 155,
  height: 155,
  borderRadius: 500,
  margin: 20
});

const OptionText = styled(Text)({
    fontSize: 18,
    margin: 20, 
  });




export { UserIcon, OptionText };


