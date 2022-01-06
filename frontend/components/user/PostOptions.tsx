import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import styles from '../../styles/User.module.scss';

type Props = {
    authorId: string;
    postId: string;
    close: () => void;
}
export const PostOptions: React.FC<Props> = ({ authorId, postId, close }) => {
    const { user } = useAuth();
    const ref = useRef<HTMLDivElement>(null);

    // Detecting click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // @ts-ignore
            if(ref.current && !ref.current.contains(e.target)) {
                close();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    const isAuthor = user?.id === authorId;
    return(
        <div className={styles['options-container']} ref={ref}>
            {isAuthor && (
                <div className={styles["options-item"] + ' ' + styles['danger']}>
                    Delete post
                </div>
            )}
            <div className={styles["options-item"] + ' ' + styles['danger']}>
                Report post
            </div>
        </div>
    )
}