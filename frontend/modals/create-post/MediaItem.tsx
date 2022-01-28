import React, { useRef } from 'react';
import { Flex } from '../../components/Flex';
import styles from '../../styles/PostModal.module.scss';

type Props = {
    tempFile: File;
    expectedHeight: number;
    expectedWidthPercentage: number;
    moreImages?: number
}
export const MediaItem: React.FC<Props> = ({ tempFile, expectedHeight, expectedWidthPercentage, moreImages }) => {
    const ref = useRef<HTMLImageElement>(null);
    const source = URL.createObjectURL(tempFile);

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
                maxWidth: `${expectedWidthPercentage}%`, minWidth: '50%',
                height: expectedHeight
            }}
            alignItems={'center'}
            className={styles['image-container']}
        >
            <img 
                src={source}
                onLoad={onLoad}
                ref={ref}
            />

            {/* If there are more than four images, display how many more there are */}
            {moreImages && (
                <Flex 
                    className={styles['extra-images']}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                >
                    <div>
                        {moreImages}+
                    </div> images
                </Flex>
            )}
        </Flex>
    )
}