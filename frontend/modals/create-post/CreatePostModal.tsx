import React, { useRef, useState } from 'react';
import { Input } from '../../components/Input';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { PostOptions } from './PostOptions';
import styles from '../../styles/PostModal.module.scss';
import { ModalFooter } from '../ModalFooter';
import { Button } from '../../components/Button';
import { Flex } from '../../components/Flex';
import { useDispatch } from 'react-redux';
import { createNotification, createPost, destroyNotification, resetNotification } from '../../redux/actions';
import { useModal } from '../../contexts/ModalProvider';
import { useTranslation } from 'next-i18next';
import { useAuth } from '../../contexts/AuthProvider';

export const CreatePostModal = () => {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [media, setMedia] = useState<File[]>([]);
    const [canPost, setCanPost] = useState(true);
    const dispatch = useDispatch();
    const notificationSent = useRef(false);
    const { close } = useModal();

    // Updating options values
    const updatePostOption = (type: string, value: any) => {
        if(type === 'media') {
            setMedia(value);
        }
    }

    // Publishing post
    const publish = async () => {
        // If post is empty
        if(!content && !media.length) {
            if(notificationSent.current) return;
            dispatch(createNotification(t('postErrorEmpty'), 'error'));
            notificationSent.current = true;
            setTimeout(() => {
                notificationSent.current = false;
            }, 6000);
            return;
        } 
        
        
        // Publishing post
        dispatch(createPost(content, media));

        // Closing modal
        close();

        // Making sure you can't post multiple times
        setCanPost(false);
    }

    return(
        <div>
            <ModalHeader>
                {t('createPostHeader')}
            </ModalHeader>
            <ModalContent>
                <Input 
                    textArea={true}
                    placeholder={t('createPostInput', { username: user.displayName })}
                    focusOnMount={true}
                    className={styles['post-input']}
                    onChange={setContent}
                />
                <PostOptions 
                    media={media}
                    updateParent={updatePostOption}
                />
            </ModalContent>
            <ModalFooter>
                <Flex justifyContent={'flex-end'}>
                    <Button onClick={publish} disabled={!canPost}>
                        {t('createPostPublish')}
                    </Button>
                </Flex>
            </ModalFooter>
        </div>
    )
}