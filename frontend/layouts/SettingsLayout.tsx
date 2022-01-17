import React from 'react';
import { Flex } from '../components/Flex';
import { SettingsSidebar } from '../components/settings/SettingsSidebar';

type Props = {
    children: any;
}
export const SettingsLayout: React.FC<Props> = ({ children }) => {
    return(
        <Flex className="settings-layout">
            <SettingsSidebar />
            {children}
        </Flex>
    )
}