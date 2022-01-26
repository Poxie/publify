import React from 'react';
import styles from '../../styles/Navbar.module.scss';
import { Flex } from '../Flex';
import { NavbarButtons } from './NavbarButtons';
import { NavbarInput } from './NavbarInput';

export const Navbar = () => {
    return(
        <div className={styles['container']}>
            <Flex 
                className={styles['main']} 
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <NavbarInput />
                <NavbarButtons />
            </Flex>
        </div>
    )
}