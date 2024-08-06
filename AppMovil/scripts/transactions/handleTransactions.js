import { createItems } from '../../constants/APIs/apis';
import { userData } from '../../constants/simulateUser';

/**
 * Efectuar compra.
 * @param {string} userId - El nombre de usuario que efectuo la trannsaccion.
 * @param {any} totalggp - Cantidad añadida o perdida del balance.
 * @param {string} date - Fecha en la que se realizo la transaccion.
 * @param {string} rason - Razon de la transaccion, compra, ganancias jugando, etc.
 */
export const handleTransaction = ( amount, totalggp, rason ) => {
    const transactionOk = true;
    const data = {
            "userId": userData._id.$oid,
            "date": new Date(), 
            "amount": amount,
            "totalggp": totalggp,  
            "reason": rason, 
            "platform": "mobile" 
        };
    if(transactionOk){
        userData.wallet.totalgg += amount;//Sumamos el balance al usuario
        console.log(userData.wallet.totalgg);
        createItems('movements', data);//Guardamos el registro
    }
    else{alert('¡Ups! algo salio mal, vuelve a intentarlo mas tarde.')}
};