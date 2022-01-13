import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentById, selectPostById } from '../../redux/selectors';
import { Input } from '../Input';

type Props = {
    parentId: string;
    type: 'post' | 'comment';
}
export const CommentInput: React.FC<Props> = ({ parentId, type }) => {
    const parent = type === 'comment' ? useAppSelector(state => selectCommentById(state, parentId)) : null;
    const dispatch = useDispatch();
    const [content, setContent] = useState('');

    // Submitting comment
    const submitComment = () => {
        dispatch(addComment(parentId, content));
    }

    return(
        <Input 
            placeholder={parent ? `Reply to ${parent.author.displayName}` : 'Add comment...'}
            onChange={setContent}
            onSubmit={submitComment}
            clearOnSubmit={true}
            focusOnMount={true}
        />
    )
}