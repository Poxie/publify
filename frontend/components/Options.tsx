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
}

const OptionItem: React.FC<OptionsItem> = ({ text, onClick, type='default' }) => {
    const className = [styles['item'], type === 'danger' ? styles['danger'] : ''].join(' ');
    return(
        <div 
            className={className}
            onClick={onClick}
        >
            {text}
        </div>
    )
}
export const Options: React.FC<Props> = ({ items, children, onChange }) => {
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