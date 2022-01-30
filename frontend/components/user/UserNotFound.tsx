import Head from 'next/head';
import React from 'react';
import { WEBSITE_NAME } from '../../utils/constants';
import { Flex } from '../Flex';

export const UserNotFound = () => {
    return(
        <>
        <Head>
            <title>
                {WEBSITE_NAME} | User not found
            </title>
        </Head>
        <Flex justifyContent={'center'}>
            <h2>
                User was not found.
            </h2>
            <span>
                Did you spell it correctly?
            </span>
        </Flex>
        </>
    )
}