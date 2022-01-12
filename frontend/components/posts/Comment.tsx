import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentAuthor } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { CommentMain } from './CommentMain';

type Props = {
    id: string;
}
export const Comment: React.FC<Props> = ({ id }) => {
    const { avatar, displayName, id: authorId } = useAppSelector(state => selectCommentAuthor(state, id));

    return(
        <Flex className={styles['comment']}>
            <Avatar 
                avatar={avatar}
                name={displayName}
                size={34}
            />
            <CommentMain 
                commentId={id}
            />
        </Flex>
    )
}