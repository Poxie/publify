import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProfileImages } from '../../../redux/actions';
import { useAppSelector } from '../../../redux/hooks';
import { selectProfileImages, selectProfileUser } from '../../../redux/selectors';
import { getMediaByAuthorId, getMediaURL } from '../../../utils';
import { Media } from '../../../utils/types';
import { LoadingImages } from '../../loading/LoadingImages';
import { ImageContainer } from './ImageContainer';

export const ProfileImages = () => {
    const dispatch = useDispatch();
    const { id } = useAppSelector(state => selectProfileUser(state));
    const images = useAppSelector(state => selectProfileImages(state));
    
    // Fetching user images
    useEffect(() => {
        getMediaByAuthorId(id)
            .then(media => {
                dispatch(setProfileImages(media));
            })
    }, [id]);

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