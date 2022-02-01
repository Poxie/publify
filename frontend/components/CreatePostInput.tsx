import React from 'react';
import styles from '../styles/Home.module.scss';
import { useAuth } from '../contexts/AuthProvider';
import { Avatar } from './Avatar';
import { Flex } from './Flex';
import { useModal } from '../contexts/ModalProvider';
import { CreatePostModal } from '../modals/create-post/CreatePostModal';
import Link from 'next/link';
import { useDeviceType } from '../hooks/useDeviceType';
import { useTranslation } from 'next-i18next';

export const CreatePostInput = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const { setModal } = useModal();
    const deviceType = useDeviceType();

    const openPostModal = () => {
        setModal(<CreatePostModal />);
    }

    return(
        <Flex className={styles['input-container']} alignItems={'center'}>
            <Link href={`/${user.username}`}>
                <a>
                    <Flex alignItems={'center'}>
                        <Avatar 
                            avatar={user.avatar}
                            name={user.displayName}
                            size={38}
                        />
                        {deviceType === 'mobile' && (
                            <span>
                                {user.displayName}
                            </span>
                        )}
                    </Flex>
                </a>
            </Link>
            <div className={styles['input']} onClick={openPostModal}>
                {t('createPostInput', { username: user.displayName })}
            </div>
        </Flex>
    )
}