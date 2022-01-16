import React from 'react';
import styles from '../../styles/User.module.scss';
import Image from 'next/image';
import { useAppSelector } from '../../redux/hooks';
import { selectPostMedia } from '../../redux/selectors';
import { getMediaURL } from '../../utils';

export const MediaPreviewContainer = React.memo(() => {
    const media = useAppSelector(state => selectPostMedia(state));

    const hasMedia = media.length > 0;
    // Getting posts media
    const visibleMedia = media.slice(0, 4);
    let height;
    switch(media.length) {
        case 1:
            height = 280;
            break;
        case 2:
            height = 200
            break;
        case 3:
            height = 320
            break;
        case 4:
            height = 320
            break;
        default:
            height = 320
    }

    return(
        <>
        {hasMedia && (
            <div 
                className={styles['preview-container']}
                style={{gridTemplateColumns: `repeat(${media.length === 1 ? 1 : 2}, 1fr)`}}
            >
                {visibleMedia.map(media => {
                    const { id } = media;

                    const mediaURL = getMediaURL(id);
                    return(
                        <div className={styles['preview-media']} key={id}>
                            <Image 
                                src={mediaURL}
                                layout="fill"
                                objectFit={'cover'}
                                objectPosition={'center'}
                            />
                        </div>
                    )
                })}
            </div>
        )}
        {!hasMedia && (
            <span className={styles['preview-empty']}>
                This user hasn't posted any media yet.
            </span>
        )}
        </>
    )
});