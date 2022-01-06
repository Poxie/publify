import Image from 'next/image';
import React from 'react';
import { PostType } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { Flex } from '../Flex';

interface Props {
    posts: PostType[];
}
const IMAGE_WIDTH = 148;
const FULL_WIDTH = 300;
export const ProfileMediaPreview: React.FC<Props> = ({ posts }) => {
    // Extracting all media from posts
    let media = [];
    posts.forEach(post => {
        media = [...media, ...post.media];
    })

    return(
        <div>
            <Flex 
                className={styles['preview-header']}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <span className={styles['preview-header-text']}>
                    Images
                </span>
                <span className={styles['preview-header-more']}>
                    View more
                </span>
            </Flex>
            <div className={styles['preview-container']}>
                {media.map(media => {
                    const { url } = media;

                    return(
                        <div className={styles['preview-media']}>
                            <Image 
                                src={url}
                                width="100%" 
                                height="100%"
                                layout="fill"
                                objectFit={'cover'}
                                objectPosition={'center'}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}