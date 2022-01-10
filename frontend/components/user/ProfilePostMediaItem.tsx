import React, { useEffect, useRef, useState } from 'react';
import { getMediaURL } from '../../utils';
import { Flex } from '../Flex';
import styles from '../../styles/User.module.scss';
import Image from 'next/image';
import { useModal } from '../../contexts/ModalProvider';

type Props = {
    expectedWidthPercentage: number;
    expectedHeight: number;
    width: number;
    height: number;
    mediaId: string;
    index: number;
    mediaCount: number;
    additaionlMedia: number;
}
export const ProfilePostMediaItem: React.FC<Props> = ({ width, height, expectedHeight, expectedWidthPercentage, mediaId, index, mediaCount, additaionlMedia }) => {
    const { setModal } = useModal();
    const source = getMediaURL(mediaId);

    if(index === 2 && mediaCount === 3) {
        expectedWidthPercentage = 100;
    }

    // Enlarge image on click
    const onClick = () => {
        setModal(
            <Flex>
                <Image 
                    src={source}
                    width={width}
                    height={height}
                />
            </Flex>,
            0
        )
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
            onClick={onClick}
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