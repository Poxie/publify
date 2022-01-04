import React from 'react';
import { PostType } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { ProfilePostHeader } from './ProfilePostHeader';

export const ProfilePost: React.FC<PostType> = ({ id, content, author }) => {
    const { name, avatar } = author;

    return(
        <div className={styles['post']}>
            <ProfilePostHeader 
                avatar={avatar}
                name={name}
            />
            {content}
        </div>
    )
}