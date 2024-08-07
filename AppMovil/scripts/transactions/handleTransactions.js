import { createItems } from '../../constants/APIs/apis';
import { useState } from 'react';
import loadUserData from '../user/loadUserData';
/**
 * Efectuar compra.
 * @param {string} userId - El nombre de usuario que efectuo la trannsaccion.
 * @param {any} totalggp - Cantidad añadida o perdida del balance.
 * @param {string} rason - Razon de la transaccion, compra, ganancias jugando, etc.
 */
export const handleTransaction = async ( amount, totalggp, rason ) => {
    const transactionOk = true;
    const user = await loadUserData();
    const data = {
            "userId": user.id,
            "date": new Date(), 
            "amount": amount,
            "totalggp": totalggp,  
            "reason": rason, 
            "platform": "mobile" 
        };
        console.log(data);
        
    if(transactionOk){
        createItems('movements', data);//Guardamos el registro
    }
    else{alert('¡Ups! algo salio mal, vuelve a intentarlo mas tarde.')}
};