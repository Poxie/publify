import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { getMediaURL } from '../../utils';
import { Media } from '../../utils/types';
import { Flex } from '../Flex';

type Props = {
    media: Media[];
}
export const ProfilePostMedia: React.FC<Props> = ({ media }) => {
    return(
        <Flex 
            className={styles['post-media']}
        >
            {media.map((media, key) => {
                const { id } = media;

                const mediaURL = getMediaURL(id);
                return(
                    <Image 
                        src={mediaURL}
                        layout="fill"
                        objectFit={'cover'}
                        objectPosition={'center'}
                        key={id}
                    />
                )
            })}
        </Flex>
    )
}