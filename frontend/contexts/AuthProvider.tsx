import React, { useEffect, useState } from 'react';
import { getMe, login } from '../utils';
import { AuthContext as AuthContextType } from '../utils/types';

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
        const { user } = await login(username, password);
        setUser(user);
    }

    const value = {
        user,
        login: loginUser
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}