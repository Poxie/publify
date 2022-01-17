import React from 'react';
import styles from '../styles/Components.module.scss';

type Props = {
    bio: string;
}
export const ProfileBio: React.FC<Props> = ({ bio }) => {
    return(
        <span className={styles['profile-bio']}>
            {bio}
        </span>
    )
}