import React from 'react';
import Image from 'next/image';
import styles from '../styles/PartialPost.module.scss';
import { getMediaURL } from '../utils';
import { Media } from '../utils/types';
import Link from 'next/link';

type Props = {
    media: Media[];
    postId: string;
}
export const PartialPostMedia: React.FC<Props> = ({ media, postId }) => {
    return(
        <div className={styles['media']}>
            {media.map((item, key) => {
                const { id, width, height } = item;

                return(
                    <Link href={`/posts/${postId}?media=${key}`}>
                        <a>
                            <div 
                                className={styles['media-item']}
                                style={{ width, height }}
                                key={id}
                            >
                                <Image 
                                    src={getMediaURL(id)}
                                    layout={'fill'}
                                    objectFit={'cover'}
                                />
                            </div>
                        </a>
                    </Link>
                )
            })}
        </div>
    )
}