import React, { useState } from 'react';
import styles from '../../styles/Post.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentReplyIds } from '../../redux/selectors';
import { Comment } from './Comment';
import { CommentInput } from './CommentInput';
import { ShowReplies } from './ShowReplies';

type Props = {
    commentId: string;
}
export const CommentReplies: React.FC<Props> = ({ commentId }) => {
    const replyIds = useAppSelector(state => selectCommentReplyIds(state, commentId));
    const [visible, setVisible] = useState(false);

    const toggle = () => {
        setVisible(previous => !previous);
    }
    
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

            {!visible && replyIds.length > 0 && (
                <ShowReplies 
                    replies={replyIds.length}
                    toggle={toggle}
                />
            )}
            {visible && (
                <div className={styles['hide-replies']} onClick={toggle}>
                    Hide replies
                </div>
            )}
        </div>
    )
}