import React from 'react';
import styles from '../../styles/Loading.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Flex } from '../Flex';
import { LoadingImage } from './LoadingImage';

export const LoadingImages = () => {
    const [width, setWidth] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            setWidth(() => {
                if(window.innerWidth > 900) {
                    return ref.current.offsetWidth / 5 - 8;
                } else if(window.innerWidth > 700) {
                    return ref.current.offsetWidth / 3 - 8;
                } else if(window.innerWidth > 400) {
                    return ref.current.offsetWidth / 2 - 8;
                } else {
                    return ref.current.offsetWidth / 1 - 8;
                }
            });
        }
        updateWidth();

        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    return(
        <Flex 
            className={styles['loading-images']}
            flexWrap={'wrap'} 
            justifyContent={'space-between'} 
            ref={ref}
        >
            <LoadingImage width={width} height={165} />
            <LoadingImage width={width} height={165} />
            <LoadingImage width={width} height={165} />
            <LoadingImage width={width} height={165} />
            <LoadingImage width={width} height={165} />
            <LoadingImage width={width} height={165} />
            <LoadingImage width={width} height={165} />
            <LoadingImage width={width} height={165} />
            <LoadingImage width={width} height={165} />
            <LoadingImage width={width} height={165} />
        </Flex>
    )
}