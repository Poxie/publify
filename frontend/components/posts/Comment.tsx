import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentAuthor, selectCommentById, selectReplyAuthor, selectReplyById } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { Comment as CommentType } from '../../utils/types';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { Options } from '../Options';
import { CommentMain } from './CommentMain';
import { CommentOptions } from './CommentOptions';
import { CommentReplies } from './CommentReplies';
import { CommentSettings } from './CommentSettings';

type Props = CommentType & {
    replyId?: string;
    type?: 'comment' | 'reply';
}
export const Comment: React.FC<Props> = React.memo(({ id, replyId, type='comment' }) => {
    const [repliesVisible, setRepliesVisible] = useState(false);
    const comment = replyId ? useAppSelector(state => selectReplyById(state, id, replyId)) : useAppSelector(state => selectCommentById(state, id));
    const author = comment.author;

    // Toggling replies visible
    const toggleVisible = () => {
        setRepliesVisible(previous => !previous);
    }

    const { avatar, displayName } = author;
    return(
        <div className={styles['comment']}>
            <Flex style={{position: 'relative'}}>
                <Avatar 
                    avatar={avatar}
                    name={displayName}
                    size={34}
                />
                <Flex alignItems={'center'}>
                    <CommentMain 
                        commentId={id}
                        replyId={replyId}
                        type={type}
                    />
                    <CommentSettings 
                        commentId={id}
                        replyId={replyId}
                    />
                </Flex>
            </Flex>

            <CommentOptions 
                commentId={id}
                replyId={replyId}
                toggleReplies={toggleVisible}
                type={type}
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
});