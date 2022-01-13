import React from 'react';
import { CommentInput } from './CommentInput';
import styles from '../../styles/Post.module.scss';
import { Flex } from '../Flex';
import { useAuth } from '../../contexts/AuthProvider';
import { Avatar } from '../Avatar';
import { PostType } from '../../utils/types';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost } from '../../redux/selectors';

export const AddComment = () => {
    const { user } = useAuth();
    const { avatar, displayName } = user;
    const { id }: PostType = useAppSelector(state => selectActivePost(state));

    return(
        <Flex className={styles['add-comment']} alignItems={'center'}>
            <Avatar 
                avatar={avatar}
                name={displayName}
                className={styles['add-comment-avatar']}
            />
            <CommentInput 
                parentId={id}
                type={'post'}
            />
        </Flex>
    )
}