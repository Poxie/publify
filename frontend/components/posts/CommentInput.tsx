import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentAuthor } from '../../redux/selectors';
import { Input } from '../Input';

type Props = {
    parentId: string;
    type: 'post' | 'comment';
}
export const CommentInput: React.FC<Props> = ({ parentId, type }) => {
    const { t } = useTranslation('post');
    const author = type === 'comment' ? useAppSelector(state => selectCommentAuthor(state, parentId)) : null;
    const dispatch = useDispatch();
    const [content, setContent] = useState('');

    // Submitting comment
    const submitComment = () => {
        dispatch(addComment(parentId, content));
    }

    return(
        <Input 
            placeholder={author ? t('inputReplyPlaceholder', { user: author.displayName }) : t('inputCommentPlaceholder')}
            onChange={setContent}
            onSubmit={submitComment}
            clearOnSubmit={true}
            focusOnMount={true}
        />
    )
}