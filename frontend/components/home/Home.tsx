import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { Feed } from './Feed';
import { CreatePostInput } from '../CreatePostInput';
import { NotLoggedIn } from './NotLoggedIn';

export const Home = () => {
    const { user } = useAuth();
    if(!user) return <NotLoggedIn />;

    return(
        <>
            <CreatePostInput />
            <Feed />
        </>
    )
}