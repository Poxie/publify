import React from 'react';
import styles from '../../styles/Post.module.scss';
import { ArrowIcon } from '../../icons/ArrowIcon';
import { Flex } from '../Flex';
import { useRouter } from 'next/router';

type Props = {
    mediaLength: number;
    currentIndex: number;
    postId: string;
}
export const MediaNavigation: React.FC<Props> = ({ mediaLength, currentIndex, postId }) => {
    const router = useRouter();

    const showLeftArrow = currentIndex > 0;
    const showRightArrow = currentIndex < mediaLength - 1;

    const increase = () => {
        router.replace(`/posts/${postId}?media=${currentIndex + 1}`, undefined, {shallow: true})
    }
    const decrease = () => {
        router.replace(`/posts/${postId}?media=${currentIndex - 1}`, undefined, {shallow: true});
    }

    return(
        <Flex 
            className={styles['media-navigation']}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            {showLeftArrow && (
                <Flex 
                    className={styles['navigation-arrow'] + ' ' + styles['left-arrow']}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={decrease}
                >
                    <ArrowIcon />
                </Flex>
            )}
            {showRightArrow && (
                <Flex 
                    className={styles['navigation-arrow'] + ' ' + styles['right-arrow']}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={increase}
                >
                    <ArrowIcon />
                </Flex>
            )}
        </Flex>
    )
}