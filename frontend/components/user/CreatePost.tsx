import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { useModal } from '../../contexts/ModalProvider';
import { CreatePostModal } from '../../modals/create-post/CreatePostModal';
import styles from '../../styles/User.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';

export const CreatePost = () => {
    const { user } = useAuth();
    const { setModal } = useModal();

    return(
        <Flex 
            className={styles['create-post']}
            alignItems={'center'}
            onClick={() => setModal(<CreatePostModal />, undefined, 450)}
        >
            <Avatar 
                avatar={user?.avatar}
                name={user?.displayName}
                className={styles['create-post-avatar']}
                size={28}
            />
            <span>
                What is on your mind?
            </span>
        </Flex>
    )
}