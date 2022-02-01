import React from 'react';
import { SettingsIcon } from '../../icons/SettingsIcon';
import { Flex } from '../Flex';
import { Notifications } from './notifications/Notificaitons';
import { NavbarButton } from './NavbarButton';
import { useAuth } from '../../contexts/AuthProvider';
import { NavbarUser } from './NavbarUser';

export const NavbarButtons = () => {
    const { user } = useAuth();

    return(
        <>
        {user && (
            <Flex justifyContent={'flex-end'} alignItems={'center'}>
                <Notifications />
                <NavbarButton path={'settings/profile'}>
                    <SettingsIcon />
                </NavbarButton>
                <NavbarUser />
            </Flex>
        )}
        </>
    )
}