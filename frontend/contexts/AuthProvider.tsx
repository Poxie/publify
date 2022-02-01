import React, { useEffect, useState } from 'react';
import { client, getMe, login } from '../utils';
import { AuthContext as AuthContextType, UserType } from '../utils/types';

const AuthContext = React.createContext({} as AuthContextType);

export const useAuth = () => React.useContext(AuthContext);

interface Props {
    children: any;
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState(null);

    // Handling initial logic
    useEffect(() => {
        getMe().then(user => {
            setUser(user);
        })
    }, []);

    // Login functionality
    const loginUser = async (username: string, password: string) => {
        const { user, token } = await login(username, password);

        // Updating request headers
        client.setHeaders({
            authorization: `Bearer ${token}`
        });

        // Setting/returning user
        setUser(user);
        return user;
    }
    // Logout functionality
    const logout = () => {
        window.localStorage.removeItem('accessToken');
        setUser(null);

        // Updating request headers
        client.setHeaders({
            authorization: ''
        })
    }

    // Updating user from outside context
    const updateUser = (user: UserType) => {
        setUser(user);
    }

    const value = {
        user,
        updateUser,
        login: loginUser,
        logout
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}