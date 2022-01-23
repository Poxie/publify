import React from 'react';
import Image from 'next/image';
import styles from '../../../styles/User.module.scss';
import { getMediaURL } from '../../../utils';
import { Media } from '../../../utils/types';
import Link from 'next/link';

const ImageItem: React.FC<Media> = ({ id, parentId, width, height }) => {
    return(
        <Link href={`/posts/${parentId}`}>
            <a className={styles['image-item']}>
                <Image 
                    layout={'fill'}
                    objectFit={'cover'}
                    src={getMediaURL(id)}
                />
            </a>
        </Link>
    )
}

type Props = {
    images: Media[];
}
export const ImageContainer: React.FC<Props> = ({ images }) => {
    return(
        <div className={styles['image-container']}>
            {images.map(image => {
                return(
                    <ImageItem 
                        {...image}
                        key={image.id}
                    />
                )
            })}
        </div>
    )
}