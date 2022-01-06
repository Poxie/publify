import React from 'react';
import { PostType } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { ProfilePostHeader } from './ProfilePostHeader';
import { ProfilePostMedia } from './ProfilePostMedia';
import { ProfilePostFooter } from './ProfilePostFooter';

export const ProfilePost: React.FC<PostType> = ({ id, content, author, media, likeCount, likes }) => {
    const { displayName, avatar } = author;

    return(
        <div className={styles['post']}>
            <ProfilePostHeader 
                avatar={avatar}
                name={displayName}
            />

            {content}

            {media.length !== 0 && (
                <ProfilePostMedia 
                    media={media}
                />
            )}

            <ProfilePostFooter 
                likes={likes}
                likeCount={likeCount}
                postId={id}
            />
        </div>
    )
}