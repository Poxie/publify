import Image from 'next/image';
import React from 'react';
import { getMediaURL } from '../../utils';
import { Media } from '../../utils/types';
import styles from '../../styles/Post.module.scss';

export const MediaItem: React.FC<Media> = ({ id, width, height }) => {
    const source = getMediaURL(id);

    return(
        <div className={styles['media-item']}>
            <Image
                src={source}
                layout={'fill'}
                objectFit={'contain'}
                alt={`User Media`}
                priority
            />
        </div>
    )
}