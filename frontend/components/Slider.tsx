import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../styles/Slider.module.scss';

interface Props {
    active: boolean;
    onChange: (state: boolean) => void;
    style?: any;
}
export const Slider: React.FC<Props> = ({ active: defaultActive, onChange, style }) => {
    const [active, setActive] = useState(defaultActive);

    useEffect(() => {
        setActive(defaultActive);
    }, [defaultActive]);

    const handleChange = () => {
        setActive(previous => !previous);
        onChange(!active);
    }

    const className = [styles['slider'] , active && styles['active']].join(' ');
    return(
        <div 
            className={className}
            onClick={handleChange}
            style={style}
        >
            <div className={styles['slider-dot']} />
        </div>
    )
}