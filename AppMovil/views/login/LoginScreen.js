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
    const [error, setError] = useState('');
    const navigation = useNavigation();
    //Form login
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const account = { 
        user: user, 
        password: pass 
    };
    //Form registrar usuario
    const [newUser, setNewUser] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [lastName, setlastName] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newPassC, setNewPassC] = useState('');
    const newAccount = { 
        user: newUser,
        email: email,
        name: name,
        lastName: lastName,
        password: newPass
     };

    const handleNavigate = () => {
        navigation.navigate('App');
      };

      function cleanForms(){
        setUser('');
        setPass('');
        setNewUser('');
        setEmail('');
        setName('');
        setlastName('');
        setNewPass('');
        setNewPassC('');
      }

// #region Inicio de sesion
    const handleLogin = async () => {
    setLoad(true);
    setError('');
    if(user === '' || pass === ''){setError('Ingresa tu Usuario y Contraseña')}
    else{
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
                    setError('Error al iniciar sesion, Verifica tus credenciales.');
                } else if (error.request) {
                    // La solicitud fue hecha pero no se recibió respuesta
                    console.log('Request:', error.request);
                    setError('Error interno, intenta de nuevo mas tarde.');
                } else {
                    // Algo pasó al configurar la solicitud
                    console.log('Error:', error.message);
                    setError('Error interno, intenta de nuevo mas tarde.');
                };
            };
    };
    
    cleanForms();
    setLoad(false);
    }; 

// #region crear nueva cuenta
    const handleSignUp = async () => {
        setLoad(true);
        if(newPass === newPassC){
                try {
                    await axios.post(`${API_URL}/api/accounts/register`, { ...newAccount });
                    console.log('Usuario creado exitosamente');
                    setLogin(true);
                    alert('Bienvenido, Ahora puedes iniciar sesion con tu nueva cuenta');
                } catch (error) {
                    console.error('Error al iniciar sesión', error);
                    setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
                    if (error.response) {
                        // El servidor respondió con un estado diferente a 2xx
                        console.log('Data:', error.response.data.error);
                        console.log('Status:', error.response.status);
                        console.log('Headers:', error.response.headers);
                        const m = toString(error.response.data.error);
                        setError('error.response.data', m);
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
        }else{setError('Las contraseñas deben coicidir.')}
        cleanForms();
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
                            <Icon name={!isPasswordVisible ? 'eye-slash' : 'eye'} size={24} style={{ margin: '15%' }} />
                        </TouchableOpacity>
                    </View>
                    {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <WhiteBoxLink onPress={() => setLogin(false)}>Regístrate</WhiteBoxLink>
                        <WhiteBoxLink>Olvidé mi Contraseña</WhiteBoxLink>
                    </View>
                </View>
                <View>
                    <PurpleButton onPress={handleLogin}>
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
                    <FormInput 
                        placeholder="Usuario" 
                        autoCapitalize="none" 
                        keyboardType="email-address"
                        onChangeText={setNewUser}
                        value = {newUser} 
                    />
                    <LabelForm>Correo Electrónico:</LabelForm>
                    <FormInput 
                        placeholder="Correo Electrónico" 
                        autoCapitalize="none" 
                        keyboardType="email-address"
                        onChangeText={setEmail}
                        value = {email} 
                    />
                    <LabelForm>Nombre:</LabelForm>
                    <FormInput 
                        placeholder="Nombre" 
                        autoCapitalize="none"
                        onChangeText={setName}
                        value = {name} 
                    />
                    <LabelForm>Apellido:</LabelForm>
                    <FormInput 
                        placeholder="Apellido" 
                        autoCapitalize="none" 
                        onChangeText={setlastName}
                        value = {lastName}
                    />
                    <LabelForm>Contraseña:</LabelForm>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormInput 
                            placeholder="Contraseña" 
                            secureTextEntry={!isPasswordVisible} 
                            onChangeText={setNewPass}
                            value = {newPass}
                            style={{ width: '85%' }} />
                        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <Icon name={!isPasswordVisible ? 'eye-slash' : 'eye'} size={24} style={{ margin: '15%' }} />
                        </TouchableOpacity>
                    </View>
                    <LabelForm>Confirmar Contraseña:</LabelForm>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <FormInput 
                            placeholder="Confirmar Contraseña" 
                            secureTextEntry={!isPasswordVisible} 
                            onChangeText={setNewPassC}
                            value = {newPassC}
                            style={{ width: '85%' }} />
                    </View>
                    {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <WhiteBoxLink onPress={() => setLogin(true)}>¿Tienes Cuenta?</WhiteBoxLink>
                    </View>
                </View>
                <View>
                    <PurpleButton onPress={ () => handleSignUp() }>
                        <ButtonText>Continuar</ButtonText>
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
}
