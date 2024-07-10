import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const ProtectedRoute = ({element: Element, ...rest}) => {
  // Obtener la cookie 'access-token'
  const allCookies = Cookies.get();
  console.log('todas las cookies', allCookies);
  const auth = Cookies.get('access-token');
  console.log(auth);
  
  // Verificar si la cookie existe
  return auth ? <Element {...rest} /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
