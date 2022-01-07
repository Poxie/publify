import React, { createRef, useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Flex } from '../../components/Flex';
import styles from '../../styles/Modals.module.scss';
import { MediaItem } from './MediaItem';
import { UploadedMedia } from './UploadedMedia';

type Props = {
    media: File[];
    addMedia: () => void;
    clearMedia: () => void;
}
export const MediaContainer: React.FC<Props> = ({ media, addMedia, clearMedia }) => {
    const [height, setHeight] = useState(200); 
    const mediaCount = media.length;
    
    // Determining height
    let maxHeight;
    if(mediaCount === 1 || mediaCount > 2) {
        maxHeight = 400;
    } else if(mediaCount === 2) {
        maxHeight = 200;
    } else if(mediaCount === 0) {
        maxHeight = 200;
    }

    // Making sure it is animated
    setTimeout(() => {
        setHeight(maxHeight);
    }, 10);

    // Only allow 4 visible images
    const visibleImages = media.slice(0,4);
    return(
        <Flex 
            className={styles['media-container']} 
            style={{ height }}
            justifyContent={'center'}
        >
            {mediaCount !== 0 && (
                <Flex className={styles['media-options']}>
                    <Button type={'secondary'} onClick={addMedia}>
                        Add Media
                    </Button>
                    <Button type={'secondary'} onClick={clearMedia}>
                        Clear Media
                    </Button>
                </Flex>
            )}
            <UploadedMedia 
                visibleImages={visibleImages}
                mediaCount={mediaCount}
            />
        </Flex>
    )
}