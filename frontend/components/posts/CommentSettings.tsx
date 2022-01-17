import React, { useState } from 'react';
import styles from '../../styles/Post.module.scss';
import { OptionsIcon } from '../../icons/OptionsIcon';
import { Options } from '../Options';
import { useDispatch } from 'react-redux';
import { removeComment } from '../../redux/actions';
import { useAuth } from '../../contexts/AuthProvider';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentAuthor, selectReplyAuthor } from '../../redux/selectors';
import { useTranslation } from 'next-i18next';

type Props = {
    commentId: string;
    replyId?: string;
}
export const CommentSettings: React.FC<Props> = ({ commentId, replyId }) => {
    const { t } = useTranslation('post');
    const { user } = useAuth();
    const [settingsVisible, setSetingsVisible] = useState(false);
    const dispatch = useDispatch();
    const author = replyId ? useAppSelector(state => selectReplyAuthor(state, commentId, replyId)) : useAppSelector(state => selectCommentAuthor(state, commentId));

    // Deleting comment
    const deleteComment = () => {
        dispatch(removeComment(commentId, replyId));
    }

    // Creating settings items
    const items = [{type: 'danger', text: t('reportComment'), onClick: () => {}}]
    if(author.id === user?.id) {
        items.push({type: 'danger', text: t('deleteComment'), onClick: deleteComment})
    }

    const className = [styles['comment-settings'], settingsVisible ? styles['visible'] : ''].join(' ');
    return(
        <div className={className}>
            <Options
                items={items}
                onChange={setSetingsVisible}
            >
                <OptionsIcon />
            </Options>
        </div>
    )
}