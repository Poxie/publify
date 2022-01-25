import React from 'react';
import styles from '../../../styles/User.module.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProfileImages } from '../../../redux/actions';
import { useAppSelector } from '../../../redux/hooks';
import { selectProfileImages, selectProfileUser } from '../../../redux/selectors';
import { getMediaByAuthorId, getMediaURL } from '../../../utils';
import { LoadingImages } from '../../loading/LoadingImages';
import { ImageContainer } from './ImageContainer';
import { useTranslation } from 'next-i18next';

export const ProfileImages = () => {
    const { t } = useTranslation('profile');
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
            {images && images?.length !== 0 && (
                <ImageContainer 
                    images={images}
                />
            )}
            {images?.length === 0 && (
                <div className={styles['empty']}>
                    <span>
                        {t('noImagesFound')}
                    </span>
                </div>
            )}
        </div>
    )
}