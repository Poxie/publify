import React from 'react';
import styles from '../../styles/Navbar.module.scss';
import { SettingsIcon } from '../../icons/SettingsIcon';
import { Flex } from '../Flex';
import { Notifications } from './notifications/Notificaitons';
import { NavbarButton } from './NavbarButton';

export const NavbarButtons = () => {
    return(
        <Flex>
            <Notifications />
            <NavbarButton path={'settings'}>
                <SettingsIcon />
            </NavbarButton>
        </Flex>
    )
}