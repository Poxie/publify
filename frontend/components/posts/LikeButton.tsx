import React from 'react';
import styles from '../../styles/Post.module.scss';
import { HeartIcon } from '../../icons/HeartIcon';
import { Flex } from '../Flex';

type Props = {
    toggle: (state: boolean) => void;
    isLiked: boolean;
    likeCount: number;
}
export const LikeButton: React.FC<Props> = ({ toggle, isLiked, likeCount }) => {
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
                {likeCount} likes
            </span>
        </Flex>
    )
}