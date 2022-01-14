import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentAuthor, selectReplyAuthor } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { CommentMain } from './CommentMain';
import { CommentOptions } from './CommentOptions';
import { CommentReplies } from './CommentReplies';

type Props = {
    id: string;
    replyId?: string;
    type?: 'comment' | 'reply';
}
export const Comment: React.FC<Props> = ({ id, replyId, type='comment' }) => {
    const [repliesVisible, setRepliesVisible] = useState(false);

    // Toggling replies visible
    const toggleVisible = () => {
        setRepliesVisible(previous => !previous);
    }

    let author;
    if(type === 'comment') {
        author = useAppSelector(state => selectCommentAuthor(state, id));
    } else {
        author = useAppSelector(state => selectReplyAuthor(state, id, replyId));
    }
    const { avatar, displayName } = author;

    return(
        <div className={styles['comment']}>
            <Flex>
                <Avatar 
                    avatar={avatar}
                    name={displayName}
                    size={34}
                />
                <CommentMain 
                    commentId={id}
                    replyId={replyId}
                    type={type}
                />
            </Flex>

            <CommentOptions 
                commentId={id}
                replyId={replyId}
                toggleReplies={toggleVisible}
            />

            {type === 'comment' && (
                <CommentReplies 
                    commentId={id}
                    visible={repliesVisible}
                    toggle={toggleVisible}
                />
            )}
        </div>
    )
}