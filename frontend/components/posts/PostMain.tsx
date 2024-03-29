import React from 'react';
import { PostHeader } from './PostHeader';
import styles from '../../styles/Post.module.scss';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';
import { PostComments } from './PostComments';
import { AddComment } from './AddComment';
import { useAuth } from '../../contexts/AuthProvider';
import { Flex } from '../Flex';

type Props = {
    hasMedia?: boolean;
}
export const PostMain: React.FC<Props> = ({ hasMedia=true }) => {
    const { user } = useAuth();

    const className = [styles['post-main'], !hasMedia ? styles['no-media'] : ''].join(' ');
    return(
        <Flex className={className} flexDirection={'column'}>
            <PostHeader />
            <PostContent />
            <PostFooter />
            {user && (
                <AddComment />
            )}
            <PostComments />
        </Flex>
    )
}