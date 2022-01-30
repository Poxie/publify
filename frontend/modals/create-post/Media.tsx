import { useTranslation } from 'next-i18next';
import React, { useEffect, useRef } from 'react';
import { Flex } from '../../components/Flex';
import { MediaIcon } from '../../icons/MediaIcon';
import styles from '../../styles/PostModal.module.scss';
import { MediaContainer } from './MediaContainer';

type Props = {
    updateParent: (value: any) => void;
    media: File[];
}
export const Media: React.FC<Props> = ({ updateParent, media }) => {
    const { t } = useTranslation();
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Opening file input
    const openFileInput = () => {
        if(!inputRef.current) return;
        inputRef.current.click();
    }
    // Detecting changes to file input
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Getting input file
        const file = e.target.files[0];
        if(!file) return;

        // Making sure we dont mutate already existing array
        const newMedia = [...media, ...[file]];
        updateParent(newMedia);

        // Resetting input value
        e.target.value = null;
    }
    // Clearing media
    const clearMedia = () => {
        updateParent([]);
    }

    // Changing styles if there are media
    const mediaContentStyle = [styles['media-content'], media.length ? styles['has-media'] : ''].join(' ');
    return(
        <Flex 
            className={styles['media']}
            alignItems={'center'}
        >
            <Flex 
                className={mediaContentStyle}
                alignItems={'center'}
            >
                <Flex 
                    onClick={openFileInput}
                    className={styles['add-media']}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                >
                    <MediaIcon />
                    <div>
                        {t('createPostAddMedia')}
                    </div>
                    <input 
                        ref={inputRef} 
                        type="file" 
                        style={{display: 'none'}}
                        onChange={onChange}
                        multiple
                    />
                </Flex>
                <MediaContainer 
                    media={media}
                    addMedia={openFileInput}
                    clearMedia={clearMedia}
                />
            </Flex>
        </Flex>
    )
}