import React from 'react';
import { CommentInput } from './CommentInput';
import styles from '../../styles/Post.module.scss';
import { Flex } from '../Flex';
import { useAuth } from '../../contexts/AuthProvider';
import { Avatar } from '../Avatar';

type Props = {
    postId: string;
}
export const AddComment: React.FC<Props> = ({ postId }) => {
    const { user } = useAuth();
    const { avatar, displayName } = user;

    return(
        <Flex className={styles['add-comment']} alignItems={'center'}>
            <Avatar 
                avatar={avatar}
                name={displayName}
                className={styles['add-comment-avatar']}
            />
            <CommentInput 
                parentId={postId}
                type={'post'}
            />
        </Flex>
    )
}