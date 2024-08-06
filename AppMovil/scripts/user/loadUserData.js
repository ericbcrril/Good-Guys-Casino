import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const loadUserData = async () => {
    try {
        // Obtener el ID de usuario desde AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
            throw new Error('No se encontró el ID de usuario en AsyncStorage');
        }

        // Hacer la solicitud para obtener los datos del usuario
        const response = await axios.get(`http://192.168.1.72:5000/api/accounts/${userId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        return null; // O lanza un error si prefieres manejarlo de otra manera
    }
};

export default loadUserData;
