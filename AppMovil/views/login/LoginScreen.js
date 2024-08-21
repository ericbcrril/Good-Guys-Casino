// LoginScreen.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, View, Image, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Estilos
import { styles } from "assets/styles/styles";
// Componentes
import { LabelForm, FormInput, ButtonText, PurpleButton, GoogleButton, GoogleButtonText } from "components/forms/formComponents";
import { Logo, WhiteBoxLink } from "components/misc/components";
// Scripts
import genToken from '../../scripts/login/genLoginToken';
//Constantes
import Constants from 'expo-constants';
const config = Constants.expoConfig || {};
const { API_URL } = config.extra || {};

const logoGG = require('assets/images/logos/logoGG.png');
const logoGgAnimated = require('assets/images/logos/logoGgAnimated.gif');

export default function LoginScreen({ route }) {
    const { setIsLoggedIn } = route.params;
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLogin, setLogin] = useState(true); 
    const [isLoad, setLoad] = useState(false); 
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();

    const account = { user: user, password: pass };

    const handleNavigate = () => {
        navigation.navigate('App');
      };

// #region Inicio de sesion
    const handleSubmit = async () => {
    setLoad(true);
    setError('');
    try {
        console.log(API_URL);
        const response = await axios.post(`${API_URL}/api/accounts/login`, { ...account }, { withCredentials: true });
        console.log('Recibo token:', response.data.aToken);
        const user = await axios.get(`${API_URL}/api/accounts/profile`, {withCredentials: true});
        const userData = await axios.get(`${API_URL}/api/accounts/${user.data.id}`, { withCredentials: true });
        //console.log(user.data);
        await AsyncStorage.clear();
        await AsyncStorage.setItem('userToken', response.data.aToken);
        await AsyncStorage.setItem('userNickName', user.data.user);
        await AsyncStorage.setItem('userId', user.data.id);
        await AsyncStorage.setItem('userEmail', userData.data.email);
        await AsyncStorage.setItem('userName', userData.data.name);
        await AsyncStorage.setItem('userLastName', userData.data.lastName);
        await AsyncStorage.setItem('userWallet', String(userData.data.wallet.totalggp));
        console.log('Sesión iniciada con éxito');
        setIsLoggedIn(true);
        handleNavigate();
    } catch (error) {
        console.error('Error al iniciar sesión', error);
        setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        if (error.response) {
            // El servidor respondió con un estado diferente a 2xx
            console.log('Data:', error.response.data);
            console.log('Status:', error.response.status);
            console.log('Headers:', error.response.headers);
            setError('Error interno, intenta de nuevo mas tarde.');
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.log('Request:', error.request);
            setError('Error interno, intenta de nuevo mas tarde.');
        } else {
            // Algo pasó al configurar la solicitud
            console.log('Error:', error.message);
            setError('Error interno, intenta de nuevo mas tarde.');
        }
    }
    setLoad(false);
}; 

// #region Login Form
    if (isLogin) {
        return (
            <View style={styles.mainLogin}>
                <View>
                    <Logo source={logoGgAnimated} resizeMode='contain' />
                </View>
                <View style={{ width: "70%" }}>
                    <LabelForm>Usuario:</LabelForm>
                    <FormInput
                        onChangeText={setUser}
                        placeholder="Usuario"
                        autoCapitalize="none"
                        value={user}
                    />
                    <LabelForm>Contraseña:</LabelForm>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormInput
                            onChangeText={setPass}
                            placeholder="Contraseña"
                            secureTextEntry={!isPasswordVisible}
                            style={{ width: '85%' }}
                            value={pass}
                        />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={24} style={{ margin: '15%' }} />
                        </TouchableOpacity>
                    </View>
                    {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <WhiteBoxLink onPress={() => setLogin(false)}>Regístrate</WhiteBoxLink>
                        <WhiteBoxLink>Olvidé mi Contraseña</WhiteBoxLink>
                    </View>
                </View>
                <View>
                    <PurpleButton onPress={handleSubmit}>
                        <ButtonText>Iniciar Sesión</ButtonText>
                    </PurpleButton>
                    <GoogleButton>
                        <Icon name="google" size={20} color="white" />
                        <GoogleButtonText>Iniciar con Google</GoogleButtonText>
                    </GoogleButton>
                </View>
                {isLoad && <ActivityIndicator size="large" color='#831675' />}
            </View>
        );
    }
// #region Registrarse Form
    if (!isLogin) {
        return (
            <View style={styles.mainLogin}>
                <Text style={{ fontWeight: 'bold', fontSize: 22, margin: 28 }}>Crear Nuevo Usuario</Text>
                <View style={{ width: "70%" }}>
                    <LabelForm>Usuario:</LabelForm>
                    <FormInput placeholder="Usuario" autoCapitalize="none" keyboardType="email-address" />
                    <LabelForm>Correo Electrónico:</LabelForm>
                    <FormInput placeholder="Correo Electrónico" autoCapitalize="none" keyboardType="email-address" />
                    <LabelForm>Nombre:</LabelForm>
                    <FormInput placeholder="Nombre" autoCapitalize="none" />
                    <LabelForm>Apellido:</LabelForm>
                    <FormInput placeholder="Apellido" autoCapitalize="none" />
                    <LabelForm>Contraseña:</LabelForm>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormInput placeholder="Contraseña" secureTextEntry={!isPasswordVisible} style={{ width: '85%' }} />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Icon name={isPasswordVisible ? 'eye-slash' : 'eye'} size={24} style={{ margin: '15%' }} />
                        </TouchableOpacity>
                    </View>
                    <LabelForm>Confirmar Contraseña:</LabelForm>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormInput placeholder="Confirmar Contraseña" secureTextEntry={!isPasswordVisible} style={{ width: '85%' }} />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <WhiteBoxLink onPress={() => setLogin(true)}>¿Tienes Cuenta?</WhiteBoxLink>
                    </View>
                </View>
                <View>
                    <PurpleButton>
                        <ButtonText>Registrar</ButtonText>
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
