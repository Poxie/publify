import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
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
            {media.map(media => {
                const { url } = media;

                return(
                    <Image 
                        src={url}
                        width="100%" 
                        height="100%"
                        layout="fill"
                        objectFit={'cover'}
                        objectPosition={'center'}
                    />
                )
            })}
        </Flex>
    )
}