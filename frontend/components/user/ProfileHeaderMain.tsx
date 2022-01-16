import React from 'react';
import styles from '../../styles/User.module.scss';
import { Avatar } from '../Avatar';

type Props = {
    avatar: string;
    name: string;
}
export const ProfileHeaderMain: React.FC<Props> = ({ avatar, name }) => {
    return(
        <div>
            <Avatar 
                avatar={avatar}
                name={name}
                size={110}
                className={styles['header-avatar']}
            />
            <span className={styles['name']}>
                {name}
            </span>
            <div className={styles['user-stats']}>
                <span>
                    42 followers
                </span>
                •
                <span>
                    76 posts
                </span>
            </div>
        </div>
    )
}