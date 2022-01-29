import React from 'react';
import styles from '../../styles/Navbar.module.scss';
import { Flex } from '../Flex';
import { NavbarButtons } from './NavbarButtons';
import { NavbarInput } from './NavbarInput';

export const Navbar = () => {
    return(
        <Flex className={styles['container']} justifyContent={'space-between'}>
            <NavbarInput />
            <NavbarButtons />
        </Flex>
    )
}