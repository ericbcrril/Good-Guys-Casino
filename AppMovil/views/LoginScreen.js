// LoginScreen.js
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
//Estilos
import { styles } from "../assets/styles/styles";
//Componentes
import { View, Image } from 'react-native';
import { LabelForm, TitleForm, FormInput, ButtonText, LoginButton, 
        GoogleButton, GoogleButtonText } from "../components/forms/formComponents";
import { Logo, WhiteBoxLink } from "../components/misc/components";
const logoGG = require('../assets/images/logos/logoGG.png');

export default function App() {
    return (
        <View style={styles.main}>
            <View>
                <Logo source={logoGG} resizeMode='contain'/>
            </View>
            <View style={{width: "70%"}}>
                <LabelForm>Usuario:</LabelForm>
                <FormInput placeholder="Usuario" autoCapitalize="none" keyboardType="email-address"/>
                <LabelForm>Contraseña:</LabelForm>
                <FormInput placeholder="Contraseña" secureTextEntry/>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <WhiteBoxLink>Registrate</WhiteBoxLink><WhiteBoxLink>Olvide mi Contraseña</WhiteBoxLink>
                </View>
            </View>
            <View>
                <LoginButton>
                    <ButtonText>Iniciar Sesión</ButtonText>
                </LoginButton>
                <GoogleButton>
                    <Icon name="google" size={20} color="white" />
                    <GoogleButtonText>Iniciar con Google</GoogleButtonText>
                </GoogleButton>
            </View>
        </View>
    );
}
