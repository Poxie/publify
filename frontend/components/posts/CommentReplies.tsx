import React, { useState } from 'react';
import styles from '../../styles/Post.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectReplies } from '../../redux/selectors';
import { Comment } from './Comment';
import { CommentInput } from './CommentInput';
import { ShowReplies } from './ShowReplies';
import { useTranslation } from 'next-i18next';

type Props = {
    commentId: string;
    visible: boolean;
    toggle: () => void;
}
export const CommentReplies: React.FC<Props> = ({ commentId, visible, toggle }) => {
    const { t } = useTranslation('post');
    const replies = useAppSelector(state => selectReplies(state, commentId));
    
    const hasReplies = replies.length > 0;
    return(
        <div className={styles['replies']}>
            {visible && (
                <>
                {replies.map(reply => {
                    return(
                        <Comment 
                            {...reply}
                            id={reply.parentId}
                            replyId={reply.id}
                            type={'reply'}
                            key={reply.id}
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
                    replies={replies.length}
                    toggle={toggle}
                />
            )}
            {visible && hasReplies && (
                <div className={styles['hide-replies']} onClick={toggle}>
                    {t('hideReplies')}
                </div>
            )}
        </div>
    )
}