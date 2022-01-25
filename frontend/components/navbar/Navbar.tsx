import React from 'react';
import styles from '../../styles/Navbar.module.scss';
import { Flex } from '../Flex';
import { NavbarInput } from './NavbarInput';

export const Navbar = () => {
    return(
        <div className={styles['container']}>
            <Flex className={styles['main']}>
                <NavbarInput />
            </Flex>
        </div>
    )
}