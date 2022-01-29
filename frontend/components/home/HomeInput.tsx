import React from 'react';
import styles from '../../styles/Home.module.scss';
import { useAuth } from '../../contexts/AuthProvider';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { useModal } from '../../contexts/ModalProvider';
import { CreatePostModal } from '../../modals/create-post/CreatePostModal';
import Link from 'next/link';

export const HomeInput = () => {
    const { user } = useAuth();
    const { setModal } = useModal()

    const openPostModal = () => {
        setModal(<CreatePostModal />);
    }

    return(
        <Flex className={styles['input-container']} alignItems={'center'}>
            <Link href={`/${user.username}`}>
                <a>
                    <Avatar 
                        avatar={user.avatar}
                        name={user.displayName}
                        size={38}
                    />
                </a>
            </Link>
            <div className={styles['input']} onClick={openPostModal}>
                What would you like to share, {user.displayName}?
            </div>
        </Flex>
    )
}