import React from 'react';
import styles from '../../styles/Post.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentReplyIds } from '../../redux/selectors';
import { Comment } from './Comment';

type Props = {
    commentId: string;
}
export const CommentReplies: React.FC<Props> = ({ commentId }) => {
    const replyIds = useAppSelector(state => selectCommentReplyIds(state, commentId));
    
    return(
        <div className={styles['replies']}>
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
        </div>
    )
}