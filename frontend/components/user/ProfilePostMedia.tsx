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

    const visibleMedia = media.slice(0,4);
    const additionalMedia = media.length - 4;
    return(
        <Flex 
            className={styles['post-media']}
            flexWrap={'wrap'}
        >
            {visibleMedia.map((media, key) => {
                const { id, width, height, parentId } = media;

                const expectedHeight = (mediaCount === 1) ? 300 : 260;
                const widthPercentage = 100 / mediaCount;
                const hasExtraMedia = additionalMedia > 0 && key === 3;
                return(
                    <ProfilePostMediaItem
                        mediaId={id}
                        postId={parentId}
                        width={width}
                        height={height}
                        expectedHeight={expectedHeight}
                        expectedWidthPercentage={widthPercentage}
                        mediaCount={mediaCount}
                        index={key}
                        additaionlMedia={hasExtraMedia ? additionalMedia : 0}
                        key={id}
                    />
                )
            })}
        </Flex>
    )
}