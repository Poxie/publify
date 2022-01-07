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
            {media.map((media, key) => {
                const { url } = media;

                return(
                    <Image 
                        src={url}
                        layout="fill"
                        objectFit={'cover'}
                        objectPosition={'center'}
                        // Change this to media.id later
                        key={key}
                    />
                )
            })}
        </Flex>
    )
}