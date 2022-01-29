import React from 'react';
import styles from '../styles/PartialPost.module.scss';

type Props = {
    content: string;
}
export const PartialPostContent: React.FC<Props> = ({ content }) => {
    return(
        <div className={styles['content']}>
            {content}
        </div>
    )
}