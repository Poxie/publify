import React from 'react';
import Image from 'next/image';
import styles from '../../styles/User.module.scss';
import { getEmojiURL } from '../../utils';
import { EDUCATION_UNICODE, LOCATION_UNICODE, RELATIONSHIP_UNICODE } from '../../utils/constants';
import { Flex } from '../Flex';

const getUnicodeByType = (type: string) => {
    switch(type) {
        case 'relationship':
            return RELATIONSHIP_UNICODE;
            break;
        case 'education':
            return EDUCATION_UNICODE;
            break;
        case 'location':
            return LOCATION_UNICODE;
            break;
        default:
            return '2754';
    }
}
type Props = {
    type: string;
    label: string;
    value: string;
    emoji?: string;
}
export const AboutItem: React.FC<Props> = ({ type, label, value, emoji }) => {
    if(!emoji) {
        emoji = getUnicodeByType(type);
    }

    return(
        <div className={styles['about-item']}>
            <span className={styles['about-item-header']}>
                {label}
            </span>
            <Flex alignItems={'center'}>
                <Flex 
                    className={styles['about-svg']}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <Image 
                        src={getEmojiURL(emoji)}
                        width={36}
                        height={36}
                    />
                </Flex>
                {value}
            </Flex>
        </div>
    )
}