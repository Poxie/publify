import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon';
import styles from '../styles/Dropdown.module.scss';
import { Flex } from './Flex';

export type DropdownItem = {
    onClick?: () => void;
    text: string;
    id: string;
}
type Props = {
    items: DropdownItem[];
    activeItemId?: string;
    className?: string;
    type?: 'primary' | 'transparent';
}

const DropdownItem: React.FC<DropdownItem> = ({ text, onClick }) => {
    return(
        <div 
            className={styles['item']}
            onClick={onClick}
        >
            {text}
        </div>
    )
}
export const Dropdown: React.FC<Props> = ({ items, activeItemId, className, type }) => {
    const [visible, setVisible] = useState(false);
    const [width, setWidth] = useState(0);
    const activeItem = items.find(item => item.id === activeItemId) || items[0];
    const ref = useRef<HTMLDivElement>(null);

    // Updating fixed element's width on mount and resize
    useEffect(() => {
        const updateWidth = () => {
            setWidth(ref.current?.offsetWidth);
        }
        updateWidth();

        window.addEventListener('resize', updateWidth);

        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    // Detecting click outside
    useEffect(() => {
        if(!visible) return;
        const handleClickOutside = (e: MouseEvent) => {
            // @ts-ignore
            if(ref.current && !ref.current.contains(e.target)) {
                toggleVisible();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [visible]);

    // Toggling all items visible
    const toggleVisible = () => {
        setVisible(previous => !previous);
    }

    const containerClassName = [
        styles['container'],
        visible ? styles['open'] : '',
        className && className,
        type === 'transparent' && styles['transparent']
    ].join(' ');
    return(
        <div className={containerClassName} ref={ref}>
            <Flex 
                justifyContent={'space-between'}
                alignItems={'center'}
                className={styles['active-item']} 
                onClick={toggleVisible}
            >
                <DropdownItem id={activeItem.id} text={activeItem.text} />
                <DropdownArrowIcon />
            </Flex>
            {visible && (
                <div 
                    className={styles['items']}
                    style={{ width: `${width}px` }}
                    onClick={toggleVisible}
                >
                    {items.map(item => {
                        return(
                            <DropdownItem 
                                {...item}
                                key={item.text}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}