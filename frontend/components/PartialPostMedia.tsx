import React from 'react';
import Image from 'next/image';
import styles from '../styles/PartialPost.module.scss';
import { getMediaURL } from '../utils';
import { Media } from '../utils/types';
import Link from 'next/link';
import { MediaGrid } from './MediaGrid';

type Props = {
    media: Media[];
    postId: string;
}
export const PartialPostMedia: React.FC<Props> = ({ media, postId }) => {
    const mediaToMap = media.slice(0, 4);
    return(
        <div className={styles['media']}>
            <MediaGrid 
                media={mediaToMap}
                postId={postId}
            />
        </div>
    )
}