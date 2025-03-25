'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if token exists
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            router.push('/');
        }
        setIsLoading(false);
    }, [router]);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('apiUrl');
        setIsAuthenticated(false);
        router.push('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
