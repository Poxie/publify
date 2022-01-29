import React from 'react';
import styles from '../../styles/Navbar.module.scss';
import { Flex } from '../Flex';
import { NavbarButtons } from './NavbarButtons';
import { NavbarInput } from './NavbarInput';
import { NavbarMainButtons } from './NavbarMainButtons';

export const Navbar = () => {
    return(
        <Flex className={styles['container']}>
            <NavbarInput />
            <NavbarMainButtons />
            <NavbarButtons />
        </Flex>
    )
}