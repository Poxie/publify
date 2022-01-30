import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../../styles/User.module.scss';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileMain } from './ProfileMain';
import { Flex } from '../Flex';

export const ProfileOverview = () => {
    return(
        <Flex className={styles['profile-overview']}>
            <ProfileSidebar />
            <ProfileMain />
        </Flex>
    )
}