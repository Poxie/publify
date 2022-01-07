import React, { createRef, useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Flex } from '../../components/Flex';
import styles from '../../styles/Modals.module.scss';
import { MediaItem } from './MediaItem';

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
            <Flex
                flexWrap={'wrap'}
                style={{width: '100%'}}
            >
                {visibleImages.map((media, key) => {
                    const expectedHeight = (mediaCount === 1) ? 400 : 200;
                    const widthPercentage = 100 / mediaCount;

                    // Amount of images not fitting container
                    let moreImages;
                    if(mediaCount - 4 > 0 && key === 3) {
                        moreImages = mediaCount - 4;
                    }
                    return(
                        <MediaItem 
                            expectedHeight={expectedHeight}
                            expectedWidthPercentage={widthPercentage}
                            tempFile={media}
                            moreImages={moreImages}
                            key={key}
                        />
                    )
                })}
            </Flex>
        </Flex>
    )
}