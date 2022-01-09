import React, { useRef } from 'react';
import { getMediaURL } from '../../utils';
import { Flex } from '../Flex';
import styles from '../../styles/User.module.scss';
import Image from 'next/image';

type Props = {
    expectedWidthPercentage: number;
    expectedHeight: number;
    mediaId: string;
    index: number;
    mediaCount: number;
    additaionlMedia: number;
}
export const ProfilePostMediaItem: React.FC<Props> = ({ expectedHeight, expectedWidthPercentage, mediaId, index, mediaCount, additaionlMedia }) => {
    const source = getMediaURL(mediaId);
    if(index === 2 && mediaCount === 3) {
        expectedWidthPercentage = 100;
    }

    return(
        <Flex
            style={{
                width: `${expectedWidthPercentage}%`, minWidth: '50%',
                height: expectedHeight,
                position: 'relative'
            }}
            alignItems={'center'}
            className={styles['image-container']}
        >
            <Image 
                src={source}
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'center'}
            />

            {/* If there are more than four images, display how many more there are */}
            {additaionlMedia && (
                <Flex 
                    className={styles['additional-images']}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                >
                    <div>
                        {additaionlMedia}+
                    </div> images
                </Flex>
            )}
        </Flex>
    )
}