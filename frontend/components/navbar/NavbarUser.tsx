import React from 'react';
import styles from '../../styles/Navbar.module.scss';
import { useAuth } from '../../contexts/AuthProvider';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { Options, OptionsItem } from '../Options';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'next-i18next';

export const NavbarUser = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();
    const { avatar, displayName } = user;

    // Defining user options
    const items: OptionsItem[] = [
        { text: t('myProfile'), onClick: () => router.push(`/${user.username}`) },
        { text: t('logout'), type: 'danger', onClick: logout }
    ];

    const className = [styles['button'], styles['user'], open && styles['active-button']].join(' ');
    return(
        <Flex alignItems={'center'} className={className}>
            <Options items={items} closeOnClick={true} onChange={setOpen}>
                <Avatar 
                    avatar={avatar}
                    name={displayName}
                    size={32}
                />
            </Options>
        </Flex>
    )
}