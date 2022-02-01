import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { Feed } from './Feed';
import { CreatePostInput } from '../CreatePostInput';

export const Home = () => {
    const { user } = useAuth();
    if(!user) return null;

    return(
        <>
            <CreatePostInput />
            <Feed />
        </>
    )
}