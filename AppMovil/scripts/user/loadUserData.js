import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const loadUserData = async () => {
    try {
        // Obtener el ID de usuario desde AsyncStorage
        const userId = await AsyncStorage.getItem('userId');
        const userNickName = await AsyncStorage.getItem('userNickName');
        const userEmail = await AsyncStorage.getItem('userEmail');
        const userName = await AsyncStorage.getItem('userName');
        const userLastName = await AsyncStorage.getItem('userLastName');
        const userWallet = await AsyncStorage.getItem('userWallet');

        // Hacer la solicitud para obtener los datos del usuario
        var data = {
            id: userId,
            name: userName,
            lastName: userLastName,
            email: userEmail,
            user: userNickName,
            wallet: {totalggp: Number(userWallet)},            
        }

        return data;
    } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
        return null; // O lanza un error si prefieres manejarlo de otra manera
    }
};

export default loadUserData;
