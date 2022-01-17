import React from 'react';
import styles from '../../styles/Post.module.scss';
import { HeartIcon } from '../../icons/HeartIcon';
import { Flex } from '../Flex';
import { useTranslation } from 'next-i18next';

type Props = {
    toggle: (state: boolean) => void;
    isLiked: boolean;
    likeCount: number;
    hasLabel?: boolean;
}
export const LikeButton: React.FC<Props> = ({ toggle, isLiked, likeCount, hasLabel=true }) => {
    const { t } = useTranslation();
    return(
        <Flex 
            className={styles['footer-item']} 
            alignItems={'center'}
            onClick={() => toggle(!isLiked)}
        >
            <HeartIcon 
                isLiked={isLiked}
            />
            <span>
                {likeCount} {hasLabel && t('likes')}
            </span>
        </Flex>
    )
}