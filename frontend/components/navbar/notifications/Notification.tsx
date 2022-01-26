import Link from 'next/link';
import React from 'react';
import styles from '../../../styles/Navbar.module.scss';
import { Notification as NotificationType } from '../../../utils/types';
import { NotificationContent } from './NotificationContent';
import { NotificationHeader } from './NotificationHeader';

export const Notification: React.FC<NotificationType> = ({ type, author, content, createdAt, targetId, image }) => {
    const path = type === 'post' ? `/posts/${targetId}` : null;
    
    return(
        <div className={styles['notification']}>
            <Link href={path}>
                <a>
                    <NotificationHeader 
                        type={type}
                        createdAt={createdAt}
                    />
                    <NotificationContent 
                        content={content}
                        author={author}
                    />
                </a>
            </Link>
        </div>
    )
}