import React, { useState } from 'react';
import { OptionsIcon } from '../../icons/OptionsIcon';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentAuthor, selectReplyAuthor } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { Options } from '../Options';
import { CommentMain } from './CommentMain';
import { CommentOptions } from './CommentOptions';
import { CommentReplies } from './CommentReplies';
import { CommentSettings } from './CommentSettings';

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
}