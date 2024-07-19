import axios from 'axios';
import { BASE_URL, handleError, handleResponse } from './response';
//Si necesitas funcionalidad mas especifica solo has la solicitud directa en el js.
/**
 * Obtener todos los elementos.
 * @param {string} endPointName - El nombre de tu endPoint declarado en Backend.
 * @returns {Promise<any>} Una promesa que se resuelve con la respuesta del servidor.
 */
export const getItems = async (endPointName ) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endPointName}`);
    return handleResponse(response); 
  } catch (error) {
    handleError(error);
  }
};

/**
 * Obtener un elemento por ID.
 * @param {string} endPointName - El nombre de tu endPoint declarado en Backend.
 * @param {string} id - El ID del elemento con el que se va a trabajar.
 * @returns {Promise<any>} Una promesa que se resuelve con la respuesta del servidor.
 */
export const getItemsById = async (endPointName , id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endPointName}/${id}`);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Crear un nuevo elemento.
 * @param {string} endPointName - El nombre de tu endPoint declarado en Backend.
 * @param {object} data - Los datos que enviaras al backend.
 * @returns {Promise<any>} Una promesa que se resuelve con la respuesta del servidor.
 */
export const createItems = async (endPointName , data) => {
  try {
    const response = await axios.post(`${BASE_URL}/${endPointName}`, data);
    console.log("Registro creado exitosamente");
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Actualizar un elemento por ID.
 * @param {string} endPointName - El nombre de tu endPoint declarado en Backend.
 * @param {string} id - El ID del elemento con el que se va a trabajar.
 * @param {object} data - Los datos que enviaras al backend.
 * @returns {Promise<any>} Una promesa que se resuelve con la respuesta del servidor.
 */
export const updateItems = async (endPointName , id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/${endPointName}/${id}`, data);
    console.log("Registro actualizado exitosamente");
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};

/**
 * Eliminar un elemento por ID.
 * @param {string} endPointName - El nombre de tu endPoint declarado en Backend.
 * @param {string} id - El ID del elemento con el que se va a trabajar.
 * @returns {Promise<any>} Una promesa que se resuelve con la respuesta del servidor.
 */
export const deleteItems = async (endPointName , id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/${endPointName}/${id}`);
      console.log("Registro eliminado");
      return handleResponse(response);
    } catch (error) {
      handleError(error);
      console.log("Error al eliminar el registro");
    }
};