import React from 'react';
import Image from 'next/image';
import styles from '../../../styles/Settings.module.scss';
import { useState } from 'react';
import { getEmojiURL } from '../../../utils';
import { EmojiPicker, PartialEmoji } from '../../EmojiPicker';
import { Flex } from '../../Flex';
import { Input } from '../../Input';
import { Dropdown, DropdownItem } from '../../Dropdown';
import { useEffect } from 'react';

const determineDefaultEmoji = (type: Props['type']) => {
    switch(type) {
        case 'location':
            return '1F3E0';
            break;
        case 'education':
            return '1F4BC';
            break;
        case 'relationship':
            return '1F49C';
            break;
        case 'custom':
            return '2754';
            break;
    }
}

type Props = {
    type: 'location' | 'education' | 'relationship' | 'custom';
    label: string;
    defaultValue?: string;
    inputType?: 'input' | 'dropdown';
    dropdownItems?: DropdownItem[];
    activeDropdownItem?: string;
    onChange?: (text: string) => void;
}
export const AboutInput: React.FC<Props> = ({ type, label, defaultValue, inputType='input', dropdownItems, activeDropdownItem, onChange }) => {
    const [value, setValue] = useState(defaultValue || '');
    const [activeEmoji, setActiveEmoji] = useState<string>(determineDefaultEmoji(type));
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    // On default value change
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

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
                {inputType === 'input' && (
                    <Input 
                        placeholder={type}
                        type={'transparent'}
                        onChange={onChange}
                        defaultValue={value}
                    />
                )}
                {inputType === 'dropdown' && (
                    <Dropdown 
                        items={dropdownItems}
                        activeItemId={activeDropdownItem}
                        className={styles['dropdown']}
                        type={'transparent'}
                    />
                )}
            </Flex>
        </div>
    )
}