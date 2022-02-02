import React from 'react';
import { SettingsIcon } from '../../icons/SettingsIcon';
import { Flex } from '../Flex';
import { Notifications } from './notifications/Notificaitons';
import { NavbarButton } from './NavbarButton';
import { useAuth } from '../../contexts/AuthProvider';
import { NavbarUser } from './NavbarUser';
import { Button } from '../Button';
import { useModal } from '../../contexts/ModalProvider';
import { LoginModal } from '../../modals/login/LoginModal';
import { useTranslation } from 'next-i18next';

export const NavbarButtons = () => {
    const { user } = useAuth();

    return(
        <Flex justifyContent={'flex-end'} alignItems={'center'}>
            {user ? (
                <>
                    <Notifications />
                    <NavbarButton path={'settings/profile'}>
                        <SettingsIcon />
                    </NavbarButton>
                    <NavbarUser />
                </>
            ) : (
                <LoginButton />
            )}
        </Flex>
    )
}

const LoginButton: React.FC = () => {
    const { t } = useTranslation();
    const { setModal } = useModal();

    return(
        <Button onClick={() => setModal(<LoginModal />)}>
            {t('login')}
        </Button>
    )
}