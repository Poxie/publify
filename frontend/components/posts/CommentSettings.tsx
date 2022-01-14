import React, { useState } from 'react';
import styles from '../../styles/Post.module.scss';
import { OptionsIcon } from '../../icons/OptionsIcon';
import { Options } from '../Options';
import { useDispatch } from 'react-redux';
import { removeComment } from '../../redux/actions';

type Props = {
    commentId: string;
    replyId?: string;
}
export const CommentSettings: React.FC<Props> = ({ commentId, replyId }) => {
    const [settingsVisible, setSetingsVisible] = useState(false);
    const dispatch = useDispatch();

    const deleteComment = () => {
        dispatch(removeComment(commentId, replyId));
    }

    const className = [styles['comment-settings'], settingsVisible ? styles['visible'] : ''].join(' ');
    return(
        <div className={className}>
            <Options
                items={[{type: 'danger', text: 'Delete comment', onClick: deleteComment}]}
                onChange={setSetingsVisible}
            >
                <OptionsIcon />
            </Options>
        </div>
    )
}