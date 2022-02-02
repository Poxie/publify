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
EmojiSection.displayName = 'EmojiSection';

const EmojiItem: React.FC<Item & Methods> = ({ name, unified, onMouseEnter, onClick }) => {
    const partialItem = { name, unified };
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return(
        <div 
            className={styles['emoji-item']}
            onMouseEnter={() => onMouseEnter(partialItem)}
            onClick={() => onClick(partialItem)}
            style={{ width: 39.34, height: 39.34 }}
        >
            {isVisible && (
                <Image 
                    width={29.3}
                    height={29.3}
                    src={getEmojiURL(unified)}
                    alt=""
                />
            )}
        </div>
    )
}
EmojiItem.displayName = 'EmojiItem';

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
EmojiSections.displayName = 'EmojiSections';

type Props = {
    onEmojiSelected: (emoji: PartialEmoji) => void;
    onClose?: () => void;
}
export const EmojiPicker: React.FC<Props> = ({ onEmojiSelected, onClose }) => {
    const [activeEmoji, setActiveEmoji] = useState<null | PartialEmoji>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            // @ts-ignore
            if(ref.current && !ref.current.contains(e.target) && onClose) {
                onClose();
            }
        }
        window.addEventListener('click', handleClick);
        return () => window.removeEventListener('click', handleClick);
    }, []);
    
    const onMouseEnter = useMemo(() => (emoji: PartialEmoji) => {
        setActiveEmoji(emoji);
    }, []);
    const onClick = useMemo(() => (emoji: PartialEmoji) => {
        onEmojiSelected(emoji);
    }, []);

    const order = ['Smileys & Emotion', 'People & Body', 'Food & Drink', 'Travel & Places', 'Objects', 'Symbols', 'Flags'];
    return(
        <div className={styles['emoji-picker']} ref={ref}>
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

EmojiPicker.displayName = 'EmojiPicker';