import React, { useState } from 'react';
import { Input } from '../../components/Input';
import { ModalContent } from '../ModalContent';
import { ModalHeader } from '../ModalHeader';
import { PostOptions } from './PostOptions';
import styles from '../../styles/Modals.module.scss';
import { ModalFooter } from '../ModalFooter';
import { Button } from '../../components/Button';
import { Flex } from '../../components/Flex';

export const CreatePostModal = () => {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);

    // Updating options values
    const updatePostOption = (type: string, value: any) => {
        if(type === 'media') {
            setMedia(value);
        }
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
                    <Button>
                        Publish
                    </Button>
                </Flex>
            </ModalFooter>
        </div>
    )
}