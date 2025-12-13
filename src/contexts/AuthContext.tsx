'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
    updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = () => {
            const storedUser = getCookie('user');
            const token = getCookie('token');

            if (token && storedUser) {
                try {
                    setUser(JSON.parse(storedUser as string));
                } catch (error) {
                    console.error('Failed to parse user cookie', error);
                    logout();
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = (userData: User, token: string) => {
        setUser(userData);
        setCookie('token', token, { maxAge: 60 * 60 * 24 * 3 }); // 3 days
        setCookie('user', JSON.stringify(userData), { maxAge: 60 * 60 * 24 * 3 });

        // Redirect based on role
        if (userData.role?.type === 'admin') {
            router.push('/admin');
        } else {
            router.push('/');
        }
    };

    const logout = () => {
        setUser(null);
        deleteCookie('token');
        deleteCookie('user');
        router.push('/');
    };

    const updateUser = (userData: User) => {
        setUser(userData);
        setCookie('user', JSON.stringify(userData), { maxAge: 60 * 60 * 24 * 3 });
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            loading,
            login,
            logout,
            updateUser
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
