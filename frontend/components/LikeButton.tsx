import React, { useState } from 'react';
import { HeartIcon } from '../icons/HeartIcon';
import styles from '../styles/User.module.scss';
import postStyles from '../styles/Post.module.scss';
import { Flex } from './Flex';
import { useAuth } from '../contexts/AuthProvider';
import { createPostLike, destroyPostLike } from '../utils';

type Props = {
    likes: string[];
    likeCount: number;
    postId: string;
}
export const LikeButton: React.FC<Props> = ({ likes, likeCount, postId }) => {
    const { user } = useAuth();
    // Set default as true if user has liked post
    const [isLiked, setIsLiked] = useState(likes.includes(user?.id));

    // Toggling like
    const toggleLiked = async () => {
        if(isLiked) {
            destroyPostLike(postId);
        } else {
            createPostLike(postId);
        }
        setIsLiked(previous => !previous);
    }

    const iconStyles = [postStyles['like-svg'], isLiked ? postStyles['is-active'] : ''].join(' ');
    return(
        <Flex
            className={styles['footer-item']}
            alignItems={'center'}
            onClick={toggleLiked}
        >
            <svg className={iconStyles} id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
                <g id="Group" fill="none" fill-rule="evenodd" transform="translate(467 392)">
                <path d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z" className={postStyles['heart']} fill="#AAB8C2"/>
                <circle id="main-circ" fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5"/>

                <g className={postStyles["grp7"]} opacity="0" transform="translate(7 6)">
                    <circle className={postStyles["oval1"]} fill="#9CD8C3" cx="2" cy="6" r="2"/>
                    <circle className={postStyles["oval2"]} fill="#8CE8C3" cx="5" cy="2" r="2"/>
                </g>

                <g className={postStyles["grp6"]} opacity="0" transform="translate(0 28)">
                    <circle className={postStyles["oval1"]} fill="#CC8EF5" cx="2" cy="7" r="2"/>
                    <circle className={postStyles["oval2"]} fill="#91D2FA" cx="3" cy="2" r="2"/>
                </g>

                <g className={postStyles["grp3"]} opacity="0" transform="translate(52 28)">
                    <circle className={postStyles["oval2"]} fill="#9CD8C3" cx="2" cy="7" r="2"/>
                    <circle className={postStyles["oval1"]} fill="#8CE8C3" cx="4" cy="2" r="2"/>
                </g>

                <g className={postStyles["grp2"]} opacity="0" transform="translate(44 6)">
                    <circle className={postStyles["oval2"]} fill="#CC8EF5" cx="5" cy="6" r="2"/>
                    <circle className={postStyles["oval1"]} fill="#CC8EF5" cx="2" cy="2" r="2"/>
                </g>

                <g className={postStyles["grp5"]} opacity="0" transform="translate(14 50)">
                    <circle className={postStyles["oval1"]} fill="#91D2FA" cx="6" cy="5" r="2"/>
                    <circle className={postStyles["oval2"]} fill="#91D2FA" cx="2" cy="2" r="2"/>
                </g>

                <g className={postStyles["grp4"]} opacity="0" transform="translate(35 50)">
                    <circle className={postStyles["oval1"]} fill="#F48EA7" cx="6" cy="5" r="2"/>
                    <circle className={postStyles["oval2"]} fill="#F48EA7" cx="2" cy="2" r="2"/>
                </g>

                <g className={postStyles["grp1"]} opacity="0" transform="translate(24)">
                    <circle className={postStyles["oval1"]} fill="#9FC7FA" cx="2.5" cy="3" r="2"/>
                    <circle className={postStyles["oval2"]} fill="#9FC7FA" cx="7.5" cy="2" r="2"/>
                </g>
                </g>
            </svg>
            <span className={styles['footer-item-text']}>
                {likeCount}
            </span>
        </Flex>
    )
}