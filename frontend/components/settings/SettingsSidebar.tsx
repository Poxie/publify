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

const items = [{text: 'Profile', path: '/settings/profile'}, {text: 'Account', path: '/settings/account'}, {text: 'Notifications', path: '/settings/notifications'}, {text: 'Languages', path: '/settings/languages'}]
export const SettingsSidebar = () => {
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