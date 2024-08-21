import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
const config = Constants.expoConfig || {};
const { API_URL } = config.extra || {};

export const logout = async (navigation) => {
  const token = await AsyncStorage.getItem('userToken');
  try {
    try {
      await axios.post(`${API_URL}/api/accounts/logout/${token}`); 
    } catch (error) {
      console.error('Error al eliminar token de sesion: ', error.response.data);
    }
    const clearStorage = await AsyncStorage.clear(); // Eliminar el almacenamiento local
    const navigateToLogin = navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
    // Asegurar que la navegación ocurra solo si la limpieza fue exitosa
    await Promise.all([clearStorage, navigateToLogin]);

    console.log('Sesión cerrada con éxito');
  } catch (e) {
    console.error('Error al cerrar sesión', e);
  }
};
