import react, { useState } from 'react';
import { MediaItem } from './MediaItem';
import styles from '../../styles/Post.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost } from '../../redux/selectors';

export const PostMedia = () => {
    const { media } = useAppSelector(state => selectActivePost(state));
    const [activeIndex, setActiveIndex] = useState(0);
    
    return(
        <div className={styles['media']}>
            <MediaItem {...media[activeIndex]} />
        </div>
    )
}