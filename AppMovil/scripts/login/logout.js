import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async (navigation) => {
  try {
    const clearStorage = await AsyncStorage.clear(); // Eliminar el almacenamiento local
    const navigateToLogin = navigation.navigate('Login'); // Navegar a la pantalla de inicio de sesión
    
    // Asegurar que la navegación ocurra solo si la limpieza fue exitosa
    await Promise.all([clearStorage, navigateToLogin]);

    console.log('Sesión cerrada con éxito');
  } catch (e) {
    console.error('Error al cerrar sesión o al navegar', e);
  }
};
