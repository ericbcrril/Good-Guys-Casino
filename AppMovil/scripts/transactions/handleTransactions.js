import { createItems } from '../../constants/APIs/apis';
import { userData } from '../../constants/simulateUser';

/**
 * Efectuar compra.
 * @param {string} userId - El nombre de usuario que efectuo la trannsaccion.
 * @param {number} amount - Cantidad añadida o perdida del balance.
 * @param {string} date - Fecha en la que se realizo la transaccion.
 * @param {string} rason - Razon de la transaccion, compra, ganancias jugando, etc.
 */
export const handleTransaction = ( userId, date, amount, rason ) => {
    const transactionOk = true;
    const data = {
            "userId": userId,
            "date": date, 
            "amount": amount, 
            "reason": rason, 
            "platform": "mobile" 
        };
    if(transactionOk){
        userData.balance += amount;
        console.log(userData.balance);
        createItems('movements', data); 
    }
    else{alert('¡Ups! algo salio mal, vuelve a intentarlo mas tarde.')}
};