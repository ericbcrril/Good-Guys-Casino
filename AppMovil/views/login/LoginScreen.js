// LoginScreen.js
import React from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
//Estilos
import { styles } from "assets/styles/styles";
//Componentes
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { LabelForm, TitleForm, FormInput, ButtonText, PurpleButton, 
        GoogleButton, GoogleButtonText } from "components/forms/formComponents";
import { Logo, WhiteBoxLink } from "components/misc/components";
const logoGG = require('assets/images/logos/logoGG.png');
const logoGgAnimated = require('assets/images/logos/logoGgAnimated.gif');

export default function App() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLogin, setLogin] = useState(true); 

    if(isLogin){
        return(
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
                    <WhiteBoxLink onPress={() => setLogin(false)}>Registrate</WhiteBoxLink><WhiteBoxLink>Olvide mi Contraseña</WhiteBoxLink>
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
    if(!isLogin){
        return(
            <View style={styles.mainLogin}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, margin: 28 }}>Crear Nuevo Usuario</Text>
            <View style={{width: "70%"}}>
                <LabelForm>Usuario:</LabelForm>
                <FormInput placeholder="Usuario" autoCapitalize="none" keyboardType="email-address"/>
                <LabelForm>Correo Electronico:</LabelForm>
                <FormInput placeholder="Correo Electronico" autoCapitalize="none" keyboardType="email-address"/>
                <LabelForm>Nombre:</LabelForm>
                <FormInput placeholder="Usuario" autoCapitalize="none" keyboardType="email-address"/>
                <LabelForm>Apellido:</LabelForm>
                <FormInput placeholder="Usuario" autoCapitalize="none" keyboardType="email-address"/>
                <LabelForm>Contraseña:</LabelForm>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <FormInput placeholder="Contraseña" secureTextEntry={isPasswordVisible} style={{width: '100%'}}/>
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={24} style={{margin: '15%'}}/>
                </TouchableOpacity>
                </View>
                <LabelForm>Confirmar Contraseña:</LabelForm>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <FormInput placeholder="Contraseña" secureTextEntry={isPasswordVisible} style={{width: '100%'}}/>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <WhiteBoxLink onPress={() => setLogin(true)}>¿Tienes Cuenta?</WhiteBoxLink>
                </View>
            </View>
            <View>
                <PurpleButton>
                    <ButtonText>Iniciar</ButtonText>
                </PurpleButton>
                <GoogleButton>
                    <Icon name="google" size={20} color="white" />
                    <GoogleButtonText>Iniciar con Google</GoogleButtonText>
                </GoogleButton>
            </View>
        </View>
        );
    }
}
