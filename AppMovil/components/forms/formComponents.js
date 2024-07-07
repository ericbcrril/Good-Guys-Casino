import { Text, TextInput, Button, TouchableOpacity } from "react-native";
import styled  from "styled-components";

const LabelForm = styled(Text)({
    fontSize: 23,
    color: "#333",
    marginBottom: 10
});

const TitleForm = styled(Text)({
    fontSize: 26,
    color: "#333",
    marginBottom: 10
});

const FormInput = styled(TextInput)({
    height: 40,
    width: "100%",
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
});

const LoginButton = styled(TouchableOpacity)({
    backgroundColor: '#831675',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
});

const ButtonText = styled(Text)({
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
});

// Estilos adicionales para el botón de Google
const GoogleButton = styled(LoginButton)({
    flexDirection: 'row',
    backgroundColor: '#5D1675',
    marginTop: 10,
});

const GoogleButtonText = styled(ButtonText)({
    marginLeft: 10,
});

export { LabelForm,TitleForm, FormInput, LoginButton, ButtonText, 
            GoogleButton, GoogleButtonText };


