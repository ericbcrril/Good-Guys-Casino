import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRouteStart = ({ component: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/accounts/Authentication', {
                    credentials: 'include'
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } 
            } catch (error) {
                console.error('Error checking auth', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        isAuthenticated ? <Component {...rest} /> : <Navigate to='/main' replace />
    );
};

export default ProtectedRouteStart;
