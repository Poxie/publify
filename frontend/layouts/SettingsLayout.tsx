import React from 'react';
import styles from '../styles/Settings.module.scss';
import { Flex } from '../components/Flex';
import { SettingsSidebar } from '../components/settings/SettingsSidebar';

type Props = {
    children: any;
}
export const SettingsLayout: React.FC<Props> = ({ children }) => {
    return(
        <Flex className={styles['layout']}>
            <SettingsSidebar />
            {children}
        </Flex>
    )
}