import React, { useRef, useState } from 'react';
import { Input } from '../../components/Input';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { PostOptions } from './PostOptions';
import styles from '../../styles/Modals.module.scss';
import { ModalFooter } from '../ModalFooter';
import { Button } from '../../components/Button';
import { Flex } from '../../components/Flex';
import { useDispatch } from 'react-redux';
import { createNotification, createPost, destroyNotification, resetNotification } from '../../redux/actions';
import { useModal } from '../../contexts/ModalProvider';

export const CreatePostModal = () => {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
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
    const publish = () => {
        // If post is empty
        if(!content && !media.length) {
            if(notificationSent.current) return;
            dispatch(createNotification('You cannot publish an empty post.', 'error'));
            notificationSent.current = true;
            return;
        } 
        
        // Publishing post
        dispatch(createPost(content));

        // Closing modal
        close();
    }

    return(
        <div>
            <ModalHeader>
                Create Post
            </ModalHeader>
            <ModalContent>
                <Input 
                    textArea={true}
                    placeholder={'What would you like to share?'}
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
                    <Button onClick={publish}>
                        Publish
                    </Button>
                </Flex>
            </ModalFooter>
        </div>
    )
}