import React from 'react';
import { CommentInput } from './CommentInput';
import styles from '../../styles/Post.module.scss';

type Props = {
    postId: string;
}
export const AddComment: React.FC<Props> = ({ postId }) => {
    return(
        <div className={styles['add-comment']}>
            <CommentInput 
                parentId={postId}
                type={'post'}
            />
        </div>
    )
}