// LoginScreen.js
import React from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
//Estilos
import { styles } from "assets/styles/styles";
//Componentes
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { LabelForm, TitleForm, FormInput, ButtonText, PurpleButton, 
        GoogleButton, GoogleButtonText } from "../../components/forms/formComponents";
import { Logo, WhiteBoxLink } from "../../components/misc/components";
const logoGG = require('assets/images/logos/logoGG.png');
const logoGgAnimated = require('assets/images/logos/logoGgAnimated.gif');

export default function App() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={styles.mainLogin}>
            <View>
                <Logo source={logoGgAnimated} resizeMode='contain'/>
            </View>
            <View style={{width: "70%"}}>
                <LabelForm>Usuario:</LabelForm>
                <FormInput placeholder="Usuario" autoCapitalize="none" keyboardType="email-address"/>
                <LabelForm>Contraseña:</LabelForm>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <FormInput placeholder="Contraseña" secureTextEntry={isPasswordVisible} style={{width: '100%'}}/>
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={24} style={{margin: '15%'}}/>
                </TouchableOpacity>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <WhiteBoxLink>Registrate</WhiteBoxLink><WhiteBoxLink>Olvide mi Contraseña</WhiteBoxLink>
                </View>
            </View>
            <View>
                <PurpleButton>
                    <ButtonText>Iniciar Sesión</ButtonText>
                </PurpleButton>
                <GoogleButton>
                    <Icon name="google" size={20} color="white" />
                    <GoogleButtonText>Iniciar con Google</GoogleButtonText>
                </GoogleButton>
            </View>
        </View>
    );
}
