import React from 'react';
import styles from '../styles/PartialPost.module.scss';
import { PostType } from '../utils/types';
import { Flex } from './Flex';
import { PartialPostContent } from './PartialPostContent';
import { PartialPostFooter } from './PartialPostFooter';
import { PartialPostHeader } from './PartialPostHeader';
import { PartialPostMedia } from './PartialPostMedia';

export const PartialPost: React.FC<PostType & {displayMedia?: boolean, className?: string}> = ({ className: _className, displayMedia=true, id, isLiked, likeCount, commentCount, author, createdAt, content, media }) => {
    const className = [styles['container'], _className].join(' ');
    return(
        <Flex className={className} justifyContent={'space-between'} flexDirection={'column'}>
            <div>
                <PartialPostHeader 
                    author={author}
                    createdAt={createdAt}
                    postId={id}
                />
                <PartialPostContent content={content} />
                {media?.length !== 0 && displayMedia && (
                    <PartialPostMedia media={media} postId={id} />
                )}
                {media?.length !== 0 && !displayMedia && (
                    <span className={styles['has-media-hidden']}>
                        Has media attached
                    </span>
                )}
            </div>
            <PartialPostFooter
                id={id}
                isLiked={isLiked}
                likeCount={likeCount}
                commentCount={commentCount}
                mediaCount={media.length}
            />
        </Flex>
    )
}