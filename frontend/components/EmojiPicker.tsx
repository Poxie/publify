import React from 'react';
import Image from 'next/image';
import styles from '../styles/EmojiPicker.module.scss';
import sections from '../assets/emojis.json';
import { getEmojiURL, getFirstLetterUppercase } from '../utils';
import { Flex } from './Flex';
import { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export type Item = typeof sections['Objects']['items'][0];
export type PartialEmoji = {
    name: string;
    unified: string;
}
type Section = {
    title: string;
    items: Item[];
}
type Sections = {
    [key: string]: Section;
};
type Methods = {
    onMouseEnter: (emoji: PartialEmoji) => void;
    onClick: (emoji: PartialEmoji) => void;
}

const EmojiSection: React.FC<Section & Methods> = React.memo(({ title, items, onMouseEnter, onClick }) => {
    return(
        <>
            <div className={styles['section-header']}>
                {title}
            </div>
            <Flex flexWrap={'wrap'} className={styles['emoji-container']}>
                {items?.map(item => {
                    return(
                        <EmojiItem 
                            {...item}
                            onMouseEnter={onMouseEnter}
                            onClick={onClick}
                            key={item.unified}
                        />
                    )
                })}
            </Flex>
        </>
    )
});

const EmojiItem: React.FC<Item & Methods> = ({ name, unified, onMouseEnter, onClick }) => {
    const partialItem = { name, unified };
    return(
        <div 
            className={styles['emoji-item']}
            onMouseEnter={() => onMouseEnter(partialItem)}
            onClick={() => onClick(partialItem)}
        >
            <Image 
                width={29.3}
                height={29.3}
                src={getEmojiURL(unified)}
            />
        </div>
    )
}

type SectionsProps = Methods & {
    sections: Sections;
    order: string[];
}
const EmojiSections: React.FC<SectionsProps> = React.memo(({ onMouseEnter, onClick, sections, order }) => {
    return(
        <div className={styles['section-container']}>
            {order.map(key => {
                return(
                    <EmojiSection 
                        {...sections[key]}
                        onMouseEnter={onMouseEnter}
                        onClick={onClick}
                        key={key}
                    />
                )
            })}
        </div>
    )
});

type Props = {
    onEmojiSelected: (emoji: PartialEmoji) => void;
}
export const EmojiPicker: React.FC<Props> = ({ onEmojiSelected }) => {
    const [activeEmoji, setActiveEmoji] = useState<null | PartialEmoji>(null);
    
    const onMouseEnter = useMemo(() => (emoji: PartialEmoji) => {
        setActiveEmoji(emoji);
    }, []);
    const onClick = useMemo(() => (emoji: PartialEmoji) => {
        onEmojiSelected(emoji);
    }, []);

    const order = ['Smileys & Emotion', 'People & Body', 'Food & Drink', 'Travel & Places', 'Objects', 'Symbols', 'Flags'];
    return(
        <div className={styles['emoji-picker']}>
            <EmojiSections 
                sections={sections}
                order={order}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
            />
            {activeEmoji && (
                <Flex 
                    className={styles['footer']}
                    alignItems={'center'}
                >
                    <Image 
                        src={getEmojiURL(activeEmoji.unified)}
                        width={30}
                        height={30}
                    />
                    <span>
                        {getFirstLetterUppercase(activeEmoji.name?.toLowerCase())}
                    </span>
                </Flex>
            )}
        </div>
    )
}