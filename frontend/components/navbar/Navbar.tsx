import React from 'react';
import { useDeviceType } from '../../hooks/useDeviceType';
import styles from '../../styles/Navbar.module.scss';
import { Flex } from '../Flex';
import { NavbarButtons } from './NavbarButtons';
import { NavbarInput } from './NavbarInput';
import { NavbarMainButtons } from './NavbarMainButtons';

export const Navbar = () => {
    const deviceType = useDeviceType();

    return(
        <Flex className={styles['container']}>
            {deviceType !== 'mobile' && (
                <NavbarInput />
            )}
            <NavbarMainButtons />
            {deviceType !== 'mobile' && (
                <NavbarButtons />
            )}
        </Flex>
    )
}