import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { Media } from '../../utils/types';
import { Flex } from '../Flex';
import { ProfilePostMediaItem } from './ProfilePostMediaItem';

type Props = {
    media: Media[];
}
export const ProfilePostMedia: React.FC<Props> = ({ media }) => {
    const mediaCount = media.length;

    return(
        <Flex 
            className={styles['post-media']}
            flexWrap={'wrap'}
        >
            {media.map((media, key) => {
                const { id } = media;

                const expectedHeight = (mediaCount === 1) ? 300 : 260;
                const widthPercentage = 100 / mediaCount;
                return(
                    <ProfilePostMediaItem
                        mediaId={id}
                        expectedHeight={expectedHeight}
                        expectedWidthPercentage={widthPercentage}
                        mediaCount={mediaCount}
                        index={key}
                        key={id}
                    />
                )
            })}
        </Flex>
    )
}