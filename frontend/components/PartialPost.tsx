import React from 'react';
import styles from '../styles/PartialPost.module.scss';
import { PostType } from '../utils/types';
import { PartialPostContent } from './PartialPostContent';
import { PartialPostFooter } from './PartialPostFooter';
import { PartialPostHeader } from './PartialPostHeader';
import { PartialPostMedia } from './PartialPostMedia';

export const PartialPost: React.FC<PostType> = ({ id, isLiked, likeCount, commentCount, author, createdAt, content, media }) => {
    return(
        <div className={styles['container']}>
            <PartialPostHeader 
                author={author}
                createdAt={createdAt}
            />
            <PartialPostContent content={content} />
            {media?.length !== 0 && (
                <PartialPostMedia media={media} postId={id} />
            )}
            <PartialPostFooter
                id={id}
                isLiked={isLiked}
                likeCount={likeCount}
                commentCount={commentCount}
                mediaCount={media.length}
            />
        </div>
    )
}