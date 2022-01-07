import React, { useState } from 'react';
import { OptionsIcon } from '../../icons/OptionsIcon';
import styles from '../../styles/User.module.scss';
import { PostOptions } from './PostOptions';

type Props = {
    authorId: string;
    postId: string;
}
export const PostOptionsContainer: React.FC<Props> = ({ authorId, postId }) => {
    const [options, setOptions] = useState(false);

    const toggle = () => {
        setOptions(previous => !previous);
    }

    return(
        <div className={styles['post-options']}>
            <div 
                className={options ? styles['active'] : ''}
                onClick={toggle}
            >
                <OptionsIcon />
            </div>
            {options && (
                <PostOptions
                    postId={postId}
                    authorId={authorId}
                    close={toggle}
                />
            )}
        </div>
    )
}