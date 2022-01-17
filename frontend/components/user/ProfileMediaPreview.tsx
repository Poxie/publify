import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { Flex } from '../Flex';
import { useAppSelector } from '../../redux/hooks';
import { selectPostMedia } from '../../redux/selectors';
import { getMediaURL } from '../../utils';
import { useTranslation } from 'next-i18next';

const IMAGE_WIDTH = 148;
const FULL_WIDTH = 300;
export const ProfileMediaPreview = () => {
    const { t } = useTranslation('profile');
    // Getting posts media
    const media = useAppSelector(state => selectPostMedia(state));

    const hasMedia = media.length > 0;
    const visibleMedia = media.slice(0, 4);
    let height;
    switch(media.length) {
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
    return(
        <div style={hasMedia ? { height } : {height: 'unset'}}>
            <Flex 
                className={styles['preview-header']}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <span className={styles['preview-header-text']}>
                    {t('images')}
                </span>
                {hasMedia && (
                    <span className={styles['preview-header-more']}>
                        {t('viewMore')}
                    </span>
                )}
            </Flex>
            {hasMedia && (
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
                                />
                            </div>
                        )
                    })}
                </div>
            )}
            {!hasMedia && (
                <span className={styles['preview-empty']}>
                    {t('noMediaFound')}
                </span>
            )}
        </div>
    )
}