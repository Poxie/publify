import React from 'react';
import styles from '../../styles/RegisterModal.module.scss';
import { Flex } from '../../components/Flex';
import { useModal } from '../../contexts/ModalProvider';
import { ModalFooter } from '../ModalFooter';
import { Button } from '../../components/Button';
import { RegisterDetailModal } from './RegisterDetailModal';
import { useDispatch } from 'react-redux';
import { createNotification } from '../../redux/actions';
import { getUserById, getUserByUsername } from '../../utils';
import { useAppSelector } from '../../redux/hooks';
import { selectNotification } from '../../redux/selectors';
import { useState } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';

type Props = {
    username: string;
    password: string;
}
export const RegisterModalFooter: React.FC<Props> = ({ username, password }) => {
    const { t } = useTranslation();
    const { goBack, setModal } = useModal();
    const notification = useAppSelector(state => selectNotification(state));
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        if(!showRegisterModal) return;

        setModal(
            <RegisterDetailModal 
                username={username}
                password={password}
            />
        )
    }, [showRegisterModal]);

    // Showing more account settings settings
    const goNext = async () => {
        // If fields are empty, throw error
        if(!username || !password) {
            if(!notification) dispatch(createNotification(t('fieldsEmpty'), 'error'));
            return;
        }

        // Loading
        setLoading(true);

        // Checking if username exists
        const user = await getUserByUsername(username);

        // // Loading complete
        setLoading(false);

        // If user exists, return
        if(user) return dispatch(createNotification(t('usernameNotAvailable'), 'error'));

        // Set showing modal
        setShowRegisterModal(true);
    }

    return(
        <ModalFooter>
            <Flex 
                justifyContent={'space-between'}
                alignItems={'center'}
                className={styles['footer']}
            >
                <span onClick={goBack}>
                    {t('loginInstead')}
                </span>
                <Button onClick={goNext} loading={loading}>
                    {t('nextText')}
                </Button>
            </Flex>
        </ModalFooter>
    )
}