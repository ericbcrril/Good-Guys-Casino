import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const loadUserMovements = async () => {
    try {
        // Obtener el ID de usuario desde AsyncStorage
        const userId = await AsyncStorage.getItem('userId');

        // Hacer la solicitud para obtener los datos del usuario
        const movements = await axios.get(`http://192.168.1.72:5000/api/movements/key/${userId}`);
        //console.log(movements.data);

        return movements.data;
    } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        return null; // O lanza un error si prefieres manejarlo de otra manera
    }
};

export default loadUserMovements;
