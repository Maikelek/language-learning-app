import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [userId, setUserId] = useState(null);
    const [decodedToken, setDecodedToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogged(!!token);
        if (token) {
            const decoded = jwtDecode(token);
            setDecodedToken(decoded);
            setUserId(decoded.userId);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsLogged(true);
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
        setUserId(decoded.userId);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
        setUserId(null);
        setDecodedToken(null);
    };

    return { isLogged, userId, decodedToken, login, logout };
};

export default useAuth;