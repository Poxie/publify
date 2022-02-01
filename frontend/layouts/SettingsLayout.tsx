import React from 'react';
import styles from '../styles/Settings.module.scss';
import { Flex } from '../components/Flex';
import { SettingsSidebar } from '../components/settings/SettingsSidebar';
import { useAuth } from '../contexts/AuthProvider';
import { useRouter } from 'next/router';

type Props = {
    children: any;
}
export const SettingsLayout: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const { user } = useAuth();
    
    // If user is loading
    if(user === null) return null;

    // If user is not logged in
    if(user === undefined) {
        router.replace('/login');
        return null;
    }

    return(
        <Flex className={styles['layout']}>
            <SettingsSidebar />
            {children}
        </Flex>
    )
}