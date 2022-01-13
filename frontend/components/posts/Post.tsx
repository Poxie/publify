import React from 'react';
import { MainLayout } from '../../layouts/MainLayout';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePostMedia } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { Flex } from '../Flex';
import { PostMain } from './PostMain';
import { PostMedia } from './PostMedia';

export const Post = () => {
    const media = useAppSelector(state => selectActivePostMedia(state));

    const hasMedia = media.length !== 0;
    return(
        <Flex className={styles['post']}>
            {hasMedia && (
                <>
                <PostMedia />
                <PostMain />
                </>
            )}
            {!hasMedia && (
                <Flex style={{width: '100%'}} justifyContent={'center'}>
                    <MainLayout>
                        <PostMain 
                            hasMedia={false}
                        />
                    </MainLayout>
                </Flex>
            )}
        </Flex>
    )
}