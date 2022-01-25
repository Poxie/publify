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
import { EDUCATION_UNICODE, LOCATION_UNICODE, RELATIONSHIP_UNICODE } from '../../../utils/constants';
import { CloseIcon } from '../../../icons/CloseIcon';

const determineDefaultEmoji = (type: Props['type'], emoji: string) => {
    if(emoji) {
        return emoji;
    }
    switch(type) {
        case 'location':
            return LOCATION_UNICODE;
            break;
        case 'education':
            return EDUCATION_UNICODE;
            break;
        case 'relationship':
            return RELATIONSHIP_UNICODE;
            break;
        case 'custom':
            return '2754';
            break;
    }
}

type Props = {
    type: 'location' | 'education' | 'relationship' | 'custom';
    label: string;
    emoji?: string;
    value?: string;
    inputType?: 'input' | 'dropdown';
    dropdownItems?: DropdownItem[];
    activeDropdownItem?: string;
    onChange?: (text: string) => void;
    isCustomizable?: boolean;
    customizedUpdate?: ({ id, label, emoji, value }) => void;
    id?: string;
    onRemove?: () => void;
}
export const AboutInput: React.FC<Props> = ({ type, label, value: defaultValue, inputType='input', dropdownItems, activeDropdownItem, onChange, isCustomizable, customizedUpdate, emoji, onRemove, id }) => {
    const [value, setValue] = useState(defaultValue || '');
    const [activeEmoji, setActiveEmoji] = useState<string>(determineDefaultEmoji(type, emoji));
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

    // On default value change
    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);

    // Toggling emoji selector
    const togglEmojiPicker = () => {
        setEmojiPickerOpen(previous => !previous);
    }

    // Hamdle change
    const handleChange = (value: string) => {
        if(onChange) {
            onChange(value);
        }
        if(customizedUpdate) {
            customizedUpdate({ id, label, value, emoji });
        }
    }

    // Updating emoji
    const updateEmoji = (emoji: PartialEmoji) => {
        customizedUpdate({ id, label, emoji: emoji.unified, value });
        setActiveEmoji(emoji.unified);
        setEmojiPickerOpen(false);
    }

    const className = [styles['about-input'], isCustomizable && styles['customizable']].join(' ');
    return(
        <div className={className}>
            {onRemove && (
                <div className={styles['remove-about']} onClick={onRemove}>
                    <CloseIcon />
                </div>
            )}
            {!isCustomizable && (
                <span className={styles['about-label']}>
                    {label}
                </span>
            )}
            {isCustomizable && (
                <Input 
                    label={'Label'}
                    placeholder={'Label... e.g. Relationship'}
                    className={styles['custom-label']}
                    defaultValue={label}
                    onChange={label => customizedUpdate({ id, label, emoji, value })}
                />
            )}
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
                    onClick={isCustomizable ? togglEmojiPicker : null}
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
                        onChange={handleChange}
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