import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { selectProfileUser } from '../../../redux/selectors';
import { getMediaByAuthorId, getMediaURL } from '../../../utils';
import { Media } from '../../../utils/types';
import { LoadingImages } from '../../loading/LoadingImages';
import { ImageContainer } from './ImageContainer';

export const ProfileImages = () => {
    const [images, setImages] = useState<Media[] | null>(null);
    const { id } = useAppSelector(state => selectProfileUser(state));
    
    useEffect(() => {
        getMediaByAuthorId(id)
            .then(media => {
                setImages(media);
            })
    }, []);

    return(
        <div>
            {!images && (
                <LoadingImages />
            )}
            {images && (
                <ImageContainer 
                    images={images}
                />
            )}
        </div>
    )
}