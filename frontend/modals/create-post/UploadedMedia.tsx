import React from 'react';
import { Flex } from '../../components/Flex';
import { MediaItem } from './MediaItem';

type Props = {
    visibleImages: File[];
    mediaCount: number;
}
export const UploadedMedia: React.FC<Props> = ({ visibleImages, mediaCount }) => {
    return(
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
    )
}