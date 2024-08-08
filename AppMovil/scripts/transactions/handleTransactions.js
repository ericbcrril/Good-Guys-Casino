import { createItems } from '../../constants/APIs/apis';
import { useState } from 'react';
import loadUserData from '../user/loadUserData';

/**
 * Efectuar compra.
 * @param {string} userId - El nombre de usuario que efectuo la transaccion.
 * @param {any} totalggp - Cantidad añadida o perdida del balance.
 * @param {string} rason - Razon de la transaccion, compra, ganancias jugando, etc.
 */
export const handleTransaction = async ( amount, totalggp, rason ) => {
    const transactionOk = true;
    const user = await loadUserData();
    const now = new Date();

    const data = {
        "userId": user.id,
        "date": now.toISOString().split('T')[0], // yyyy-mm-dd
       // "time": now.toTimeString().split(' ')[0], // HH:mm:ss
        "amount": amount,
        "totalggp": totalggp,  
        "reason": rason, 
        "platform": "mobile" 
    };
    
    console.log(data);

    if (transactionOk) {
        createItems('movements', data); // Guardamos el registro
    } else {
        alert('¡Ups! algo salió mal, vuelve a intentarlo más tarde.');
    }
};
