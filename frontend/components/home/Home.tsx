import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { Feed } from './Feed';
import { HomeInput } from './HomeInput';

export const Home = () => {
    const { user } = useAuth();
    if(!user) return null;

    return(
        <div>
            <HomeInput />
            <Feed />
        </div>
    )
}