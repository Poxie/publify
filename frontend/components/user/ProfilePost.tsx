import React from 'react';
import { PostType } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { ProfilePostHeader } from './ProfilePostHeader';
import { ProfilePostMedia } from './ProfilePostMedia';
import { ProfilePostFooter } from './ProfilePostFooter';
import { useAppSelector } from '../../redux/hooks';
import { selectPostById } from '../../redux/selectors';

type Props = {
    postId: string;
}
export const ProfilePost: React.FC<Props> = ({ postId }) => {
    // Getting post
    const post = useAppSelector(state => selectPostById(state, postId));

    const { author, content, media, likes, likeCount, createdAt } = post;
    const { displayName, avatar, username } = author;

    return(
        <div className={styles['post']}>
            <ProfilePostHeader 
                avatar={avatar}
                username={username}
                name={displayName}
                postId={postId}
                authorId={author.id}
                createdAt={createdAt}
            />

            {content}

            {media.length !== 0 && (
                <ProfilePostMedia 
                    media={media}
                />
            )}

            <ProfilePostFooter 
                postId={postId}
            />
        </div>
    )
}