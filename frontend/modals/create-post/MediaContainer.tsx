import React, { createRef, useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button';
import { Flex } from '../../components/Flex';
import styles from '../../styles/Modals.module.scss';

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
                    const source = URL.createObjectURL(media);
                    const expectedHeight = (mediaCount === 1) ? 400 : 200;

                    const ref = createRef<HTMLImageElement>();
                    const onLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        // Freeing memory on load
                        URL.revokeObjectURL(source);

                        // Setting width/height if it doesn't cover area
                        const { offsetHeight } = e.currentTarget;
                        if(offsetHeight < expectedHeight) {
                            e.currentTarget.style.height = '100%'
                        }
                    }

                    return(
                        <Flex
                            style={{
                                maxWidth: `${100 / mediaCount}%`, minWidth: '50%',
                                height: expectedHeight
                            }}
                            alignItems={'center'}
                            className={styles['image-container']}
                            key={key}
                        >
                            <img 
                                src={source}
                                onLoad={onLoad}
                                ref={ref}
                            />

                            {/* If there are more than four images, display how many more there are */}
                            {key === 3 && mediaCount > 4 && (
                                <Flex 
                                    className={styles['extra-images']}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    flexDirection={'column'}
                                >
                                    <div>
                                        {mediaCount - 4}+
                                    </div> images
                                </Flex>
                            )}
                        </Flex>
                    )
                })}
            </Flex>
        </Flex>
    )
}