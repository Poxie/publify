import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../styles/Settings.module.scss';

type Props = {
    text: string;
    path: string;
}
const SidebarItem: React.FC<Props> = ({ text, path }) => {
    const router = useRouter();

    const className = [styles['sidebar-item'], router.asPath === path ? styles['active'] : ''].join(' ');
    return(
        <div className={className}>
            <Link href={path}>
                {text}
            </Link>
        </div>
    )
}

export const SettingsSidebar = () => {
    const { t } = useTranslation('settings');
    const items = [
        {text: t('profileTab'), path: '/settings/profile'},
        {text: t('aboutTab'), path: '/settings/about'},
        {text: t('accountTab'), path: '/settings/account'}, 
        {text: t('notificationsTab'), path: '/settings/notifications'}, 
        {text: t('languagesTab'), path: '/settings/languages'}
    ]
   
    return(
        <div className={styles['sidebar']}>
            {items.map(item => {
                return(
                    <SidebarItem 
                        {...item}
                        key={item.text}
                    />
                )
            })}
        </div>
    )
}