import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import styles from '../styles/Components.module.scss';
import { getMediaURL } from '../utils';
import { Media } from '../utils/types';

export const MediaGrid: React.FC<{media: Media[], postId: string}> = ({ media, postId }) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const prevSize = useRef({ width: 0, height: 0 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!ref.current) return;

        const updateSize = () => {
            // Getting container dimensions
            const { width, height } = ref.current.getBoundingClientRect();

            // If is same as previously, return
            if(JSON.stringify(prevSize.current) === JSON.stringify({ width, height })) return;

            // Else update size
            setContainerSize({ width, height });
            prevSize.current = { width, height };
        }
        updateSize();

        // Binding/unbinding listeners
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    return(
        <div className={styles['media-container']} ref={ref}>
            {media.map((item, key) => {
                return(
                    <MediaGridItem 
                        {...item}
                        postId={postId}
                        mediaCount={media.length}
                        index={key}
                        containerSize={containerSize}
                        key={item.id}
                    />
                )
            })}
        </div>
    )
}

const SPACING = 1;
const determineWidth = ({ index, mediaCount, containerWidth }: {index: number, mediaCount: number, containerWidth: number}) => {
    switch(mediaCount) {
        case 1:
            return containerWidth;
        case 4:
        case 2:
            return (containerWidth / 2) - SPACING;
        case 3:
            if(index > 1) {
                return containerWidth;
            } else {
                return (containerWidth / 2) - SPACING;
            }
    }
}
const determineHeight = ({ mediaCount, index }) => {
    if(mediaCount === 1) {
        return 400;
    }
    if(index < 2 && mediaCount > 1) {
        return 300;
    } else if(index >= 2 && mediaCount > 1) {
        return 300;
    }
}
const MediaGridItem: React.FC<Media & {postId: string, index: number, mediaCount: number, containerSize: {width: number, height: number}}> = ({ id, width, height, postId, index, mediaCount, containerSize }) => {
    const { width: containerWidth } = containerSize;
    return(
        <Link href={`/posts/${postId}?media=${index}`}>
            <a>
                <div 
                    className={styles['media-item']}
                    style={{ width: determineWidth({ containerWidth, index, mediaCount }), height: determineHeight({mediaCount, index}) }}
                    key={id}
                >
                    <Image 
                        src={getMediaURL(id)}
                        layout={'fill'}
                        objectFit={'cover'}
                    />
                </div>
            </a>
        </Link>
    )
}