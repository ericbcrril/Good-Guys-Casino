import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const AlertRoute = ({ message, to }) => {
    useEffect(() => {
        alert(message);
    }, [message]);

    return <Navigate to={to} replace />;
};

export default AlertRoute;
