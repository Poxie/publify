import react, { useEffect, useState } from 'react';
import { MediaItem } from './MediaItem';
import styles from '../../styles/Post.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost } from '../../redux/selectors';
import { MediaHeader } from './MediaHeader';
import { Flex } from '../Flex';
import { useRouter } from 'next/router';
import { MediaNavigation } from './MediaNavigation';

export const PostMedia = () => {
    const router = useRouter();
    const { media, id } = useAppSelector(state => selectActivePost(state));
    const [activeIndex, setActiveIndex] = useState(0);

    // Updating active index by query params
    useEffect(() => {
        const mediaIndex = Array.isArray(router.query.media) ? parseInt(router.query.media[0]) : parseInt(router.query.media);
        if(isNaN(mediaIndex) || mediaIndex > media.length - 1 || mediaIndex < 0) {
            router.replace(`/posts/${id}?media=0`);
            return
        }
        setActiveIndex(mediaIndex);
    }, [router.query]);
    
    return(
        <div className={styles['media']}>
            <MediaHeader />
            <MediaItem {...media[activeIndex]} />
            <MediaNavigation 
                postId={id}
                mediaLength={media.length}
                currentIndex={activeIndex}
            />
        </div>
    )
}