import React from 'react';
import styles from '../../styles/User.module.scss';
import { Flex } from '../Flex';
import { LikeButton } from '../LikeButton';
import { CommentButton } from './CommentButton';
import { ArrowIcon } from '../../icons/ArrowIcon';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

type Props = {
    postId: string;
}
export const ProfilePostFooter: React.FC<Props> = ({ postId }) => {
    const { t } = useTranslation('profile');
    const router = useRouter();

    return(
        <Flex className={styles['post-footer']} justifyContent={'space-between'}>
            <Flex>
                <LikeButton
                    postId={postId}
                />
                <CommentButton 
                    postId={postId}
                />
            </Flex>
            <Flex 
                alignItems={'center'}
                className={styles['expand-post']}
                onClick={() => router.push(`/posts/${postId}`)}
            >
                <span>
                    {t('expandPost')}
                </span> 
                <ArrowIcon />
            </Flex>
        </Flex>
    )
}