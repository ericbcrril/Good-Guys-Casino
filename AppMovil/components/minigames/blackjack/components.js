import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import styled  from "styled-components";

const GameContainer = styled(View)({
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FF33CC',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#2D0130',
}); 

const GameTitle = styled(Text)({
    fontSize: 24,
    fontFamily: 'PressStart2P',
    color: '#FFFFFF',
    textShadow: '2px 2px #000000',
    margin: '5%',
});

const GameButton = styled(TouchableOpacity)({
    padding: 10,
    margin: 10,
    backgroundColor: '#FF33CC',
    borderColor: '#FF33CC',
    borderWidth: 2,
    borderRadius: 5,
    alignItems: 'center',
});

const TextGameButton = styled(Text)({
    color: '#FFFF',
    fontSize: 16,
    fontFamily: 'PressStart2P',
    textShadow: '2px 2px #000000',
});

const ResetButton = styled(TouchableOpacity)({
    backgroundColor: '#FF3333',
    borderColor: '#FF3333',
    alignItems: 'center',
    padding: 5,
    margin: 10,
});

const GameTextInput = styled(TextInput)({
    padding: 5,
    margin: 10,
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'PressStart2P',
    backgroundColor: '#2D0130',
    borderWidth: 2,
    borderColor: '#FF33CC',
    borderRadius: 5,
    textAlign: 'center',
});

const ButtonText = styled(Text)({
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
});

const GameText = styled(Text)({
    color: 'white',
    fontSize: 16,
    fontFamily: 'PressStart2P',
    margin: 1,
});

export { GameText, GameContainer, GameButton, TextGameButton, GameTitle, GameTextInput, ButtonText, ResetButton };
