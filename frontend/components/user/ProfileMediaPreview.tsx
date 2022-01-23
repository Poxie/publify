import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { Flex } from '../Flex';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileImages, selectProfilePreview, selectProfileUser } from '../../redux/selectors';
import { getMediaByAuthorId, getMediaURL } from '../../utils';
import { useTranslation } from 'next-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setPreviewImages } from '../../redux/actions';

const IMAGE_WIDTH = 148;
const FULL_WIDTH = 300;
export const ProfileMediaPreview = () => {
    const { t } = useTranslation('profile');
    const { id } = useAppSelector(state => selectProfileUser(state));
    const dispatch = useDispatch();
    
    // Getting posts media
    let media = useAppSelector(state => selectProfilePreview(state));
    const allMedia = useAppSelector(state => selectProfileImages(state));

    // Fetching media if isn't in redux store
    useEffect(() => {
        if(media && media[0]?.authorId === id) return;
        if(allMedia?.length && allMedia[0]?.authorId === id) {
            const newPreview = allMedia.slice(0, 4);
            dispatch(setPreviewImages(newPreview));
            return
        }

        // Fetching media
        getMediaByAuthorId(id).then(media => {
            // Updating media
            dispatch(setPreviewImages(media));
        })
    }, []);

    const visibleMedia = media?.slice(0, 4);
    let height;
    switch(media?.length) {
        case 0:
            height = 'unset';
            break;
        case 1:
            height = 280;
            break;
        case 2:
            height = 200
            break;
        case 3:
            height = 320
            break;
        case 4:
            height = 320
            break;
        default:
            height = 320
    }

    console.log(media);
    return(
        <div style={media ? { height } : {height: 'unset'}}>
            <Flex 
                className={styles['preview-header']}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <span className={styles['preview-header-text']}>
                    {t('images')}
                </span>
                {media && (
                    <span className={styles['preview-header-more']}>
                        {t('viewMore')}
                    </span>
                )}
            </Flex>
            {media && (
                <div 
                    className={styles['preview-container']}
                    style={{gridTemplateColumns: `repeat(${media.length === 1 ? 1 : 2}, 1fr)`}}
                >
                    {visibleMedia.map(media => {
                        const { id } = media;

                        const mediaURL = getMediaURL(id);
                        return(
                            <div className={styles['preview-media']} key={id}>
                                <Image 
                                    src={mediaURL}
                                    layout="fill"
                                    objectFit={'cover'}
                                    objectPosition={'center'}
                                    alt=""
                                />
                            </div>
                        )
                    })}
                </div>
            )}
            {media !== null && !media.length && (
                <span className={styles['preview-empty']}>
                    {t('noMediaFound')}
                </span>
            )}
        </div>
    )
}