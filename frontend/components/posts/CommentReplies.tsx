import React, { useState } from 'react';
import styles from '../../styles/Post.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentReplyIds } from '../../redux/selectors';
import { Comment } from './Comment';
import { CommentInput } from './CommentInput';
import { ShowReplies } from './ShowReplies';

type Props = {
    commentId: string;
    visible: boolean;
    toggle: () => void;
}
export const CommentReplies: React.FC<Props> = ({ commentId, visible, toggle }) => {
    const replyIds = useAppSelector(state => selectCommentReplyIds(state, commentId));
    
    const hasReplies = replyIds.length > 0;
    return(
        <div className={styles['replies']}>
            {visible && (
                <>
                {replyIds.map(replyId => {
                    return(
                        <Comment 
                            id={commentId}
                            replyId={replyId}
                            type={'reply'}
                            key={replyId}
                        />
                    )
                })}
                <CommentInput 
                    parentId={commentId}
                    type={'comment'}
                />
                </>
            )}

            {!visible && hasReplies && (
                <ShowReplies 
                    replies={replyIds.length}
                    toggle={toggle}
                />
            )}
            {visible && hasReplies && (
                <div className={styles['hide-replies']} onClick={toggle}>
                    Hide replies
                </div>
            )}
        </div>
    )
}