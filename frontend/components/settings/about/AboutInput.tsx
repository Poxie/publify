import React from 'react';
import Image from 'next/image';
import styles from '../../../styles/Settings.module.scss';
import { useState } from 'react';
import { getEmojiURL } from '../../../utils';
import { EmojiPicker, PartialEmoji } from '../../EmojiPicker';
import { Flex } from '../../Flex';
import { Input } from '../../Input';

const determineDefaultEmoji = (type: Props['type']) => {
    switch(type) {
        case 'location':
            return '1F3E0';
            break;
        case 'education':
            return '1F4BC';
            break;
        case 'custom':
            return '2754';
            break;
    }
}

type Props = {
    type: 'location' | 'education' | 'custom';
    label: string;
    defaultValue?: string;
}
export const AboutInput: React.FC<Props> = ({ type, label, defaultValue }) => {
    const [value, setValue] = useState(defaultValue || '');
    const [activeEmoji, setActiveEmoji] = useState<string>(determineDefaultEmoji(type));
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    // Toggling emoji selector
    const togglEmojiPicker = () => {
        setEmojiPickerOpen(previous => !previous);
    }
    // Updating emoji
    const updateEmoji = (emoji: PartialEmoji) => {
        setActiveEmoji(emoji.unified);
        setEmojiPickerOpen(false);
    }

    return(
        <div className={styles['about-input']}>
            <span className={styles['about-label']}>
                {label}
            </span>
            <Flex>
                {emojiPickerOpen && (
                    <EmojiPicker 
                        onEmojiSelected={updateEmoji}
                    />
                )}
                <Flex 
                    className={styles['about-icon']}
                    alignItems={'center'}
                    justifyContent={'center'}
                    onClick={togglEmojiPicker}
                >
                    <Image 
                        width={32}
                        height={32}
                        src={getEmojiURL(activeEmoji)}
                    />
                </Flex>
                <Input 
                    placeholder={type}
                    type={'transparent'}
                />
            </Flex>
        </div>
    )
}