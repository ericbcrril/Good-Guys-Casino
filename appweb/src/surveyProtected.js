import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const SurveyProtected = ({ component: Component, ...rest }) => {
    const [answered, setAnswered] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/survey/checkUser', {
                    credentials: 'include'
                });

                if (response.ok) {
                    setAnswered(true);
                } 
            } catch (error) {
                console.error('Error checking id user', error);
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
        answered ? <Component {...rest} /> : <Navigate to='/survey' replace />
    );
};

export default SurveyProtected;
