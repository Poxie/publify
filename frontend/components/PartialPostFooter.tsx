import React, { useState } from 'react';
import styles from '../styles/PartialPost.module.scss';
import { HeartIcon } from '../icons/HeartIcon';
import { Flex } from './Flex';
import { CommentsIcon } from '../icons/CommentsIcon';
import { LoginModal } from '../modals/login/LoginModal';
import { createLike, destroyLike } from '../utils';
import { ArrowIcon } from '../icons/ArrowIcon';
import { useAuth } from '../contexts/AuthProvider';
import { useModal } from '../contexts/ModalProvider';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = {
    id: string;
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
    mediaCount: number;
}
export const PartialPostFooter: React.FC<Props> = ({ id, isLiked, likeCount, commentCount, mediaCount }) => {
    return(
        <Flex className={styles['footer']} justifyContent={'space-between'}>
            <Flex>
                <LikeButton 
                    isLiked={isLiked}
                    likeCount={likeCount}
                    postId={id}
                />
                <CommentButton 
                    commentCount={commentCount}
                    postId={id}
                />
            </Flex>
            <ExpandButton 
                postId={id}
                mediaCount={mediaCount}
            />
        </Flex>
    )
}

const ExpandButton: React.FC<{postId: string, mediaCount: number}> = ({ postId, mediaCount }) => {
    const className = [styles['footer-item'], styles['expand-button']].join(' ');
    const href = `/posts/${postId}` + (mediaCount && '?media=0');
    return(
        <Link href={href}>
            <a>
                <Flex className={className} alignItems={'center'}>
                    <span>
                        Expand
                    </span>
                    <ArrowIcon />
                </Flex>
            </a>
        </Link>
    )
}

type LikeProps = {
    postId: string;
    isLiked: boolean;
    likeCount: number;
}
const LikeButton: React.FC<LikeProps> = ({ postId, isLiked: _isLiked, likeCount: _likeCount }) => {
    const { user } = useAuth();
    const { setModal } = useModal();
    const [isLiked, setIsLiked] = useState(_isLiked);
    const [likeCount, setLikeCount] = useState(_likeCount);

    const toggle = () => {
        if(!user) {
            setModal(<LoginModal />);
            return;
        }

        setIsLiked(prev => !prev);
        setLikeCount(prev => prev + (isLiked ? - 1 : + 1))
        if(isLiked) {
            destroyLike(postId);
        } else {
            createLike(postId);
        }
    }

    return(
        <Flex
            onClick={toggle}
            className={styles['footer-item']}
            alignItems={'center'}
        >
            <HeartIcon 
                isLiked={isLiked}
            />
            <span>
                {likeCount}
            </span>
        </Flex>
    )
}

const CommentButton: React.FC<{commentCount: number, postId: string}> = ({ commentCount, postId }) => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/posts/${postId}`);
    }

    return(
        <Flex
            className={styles['footer-item']}
            alignItems={'center'}
            onClick={onClick}
        >
            <CommentsIcon />
            <span>
                {commentCount}
            </span>
        </Flex>
    )
}