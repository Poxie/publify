import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles/Options.module.scss';

export type OptionsItem = {
    text: string;
    onClick: () => void;
    type?: 'default' | 'danger';
}
type Props = {
    items: OptionsItem[];
    children: any;
    onChange?: (state: boolean) => void;
    closeOnClick?: boolean;
}

const OptionItem: React.FC<OptionsItem & {onItemClick: () => void}> = ({ text, onClick, type='default', onItemClick }) => {
    const handleClick = () => {
        onClick();
        onItemClick();
    }

    const className = [styles['item'], type === 'danger' ? styles['danger'] : ''].join(' ');
    return(
        <div 
            className={className}
            onClick={handleClick}
        >
            {text}
        </div>
    )
}
export const Options: React.FC<Props> = ({ items, children, onChange, closeOnClick }) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
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

    // Toggling options menu
    const toggleVisible = () => {
        setVisible(previous => {
            if(onChange) {
                onChange(!previous);
            }
            return !previous;
        });
    }

    // Extra functionality on item click
    const onItemClick = () => {
        if(!closeOnClick) return;
        toggleVisible();
    }

    return(
        <div ref={ref}>
            <div onClick={toggleVisible}>
                {children}
            </div>
            {visible && (
                <div className={styles['item-container']}>
                    {items.map(item => {
                        return(
                            <OptionItem 
                                {...item}
                                onItemClick={onItemClick}
                                key={item.text}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}

Options.displayName = 'ComponentOptions';