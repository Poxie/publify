import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePostContent } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';

export const PostContent = () => {
    const content = useAppSelector(state => selectActivePostContent(state));

    return(
        <div className={styles['post-content']}>
            <span>
                {content}
            </span>
        </div>
    )
}