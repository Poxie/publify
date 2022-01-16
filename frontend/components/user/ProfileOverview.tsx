import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../../styles/User.module.scss';
import { useRouter } from 'next/router';
import { Flex } from '../Flex';
import { ProfilePosts } from './ProfilePosts';
import { ProfileMediaPreview } from './ProfileMediaPreview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts, loadMorePosts } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectPostIds } from '../../redux/selectors';
import { CreatePost } from './CreatePost';
import { LoadingPosts } from '../loading/LoadingPosts';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileMain } from './ProfileMain';

export const ProfileOverview = () => {
    return(
        <Flex className={styles['profile-overview']}>
            <ProfileSidebar />
            <ProfileMain />
        </Flex>
    )
}