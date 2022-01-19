import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Flex } from '../../components/Flex';
import { MediaIcon } from '../../icons/MediaIcon';
import styles from '../../styles/PostModal.module.scss';
import { Media } from './Media';

type Props = {
    media: File[];
    updateParent: (type: string, value: any) => void;
}
export const PostOptions: React.FC<Props> = ({ media, updateParent }) => {
    const [activeOption, setActiveOption] = useState<string | null>(null);
    const [visible, setVisible] = useState(false);

    // Changing active option
    const updateActiveOption = (option: string) => {
        setActiveOption(previous => {
            if(previous === option && visible) {
                setVisible(false);
                return previous;
            };

            setVisible(true);
            return option;
        })
    }

    // Determining what option should be displayed
    let option = null;
    switch(activeOption) {
        case 'media':
            option = (
                <Media 
                    updateParent={(value) => updateParent('media', value)}
                    media={media}
                />
            )
    }

    const extraOptionStyles = [styles['extra-options'], !visible ? styles['options-out'] : ''].join(' ');
    return(
        <div className={styles['post-options']}>
            <div className={extraOptionStyles}>
                {option && (
                    <div className={styles['visible-option']}>
                        {option}
                    </div>
                )}
            </div>
            <Flex className={styles['option-container']}>
                <Button 
                    type={'transparent'}
                    className={styles['post-option']}
                    onClick={() => updateActiveOption('media')}
                >
                    <MediaIcon />
                </Button>
            </Flex>
        </div>
    )
}