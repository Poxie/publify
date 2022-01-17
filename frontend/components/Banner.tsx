import React from 'react';
import styles from '../styles/Components.module.scss';
import { getUserBanner } from '../utils';

type Props = {
    banner: string;
    onBannerClick?: () => void;
    bannerHoverText: string;
    type?: 'large' | 'small';
    className?: string;
}
export const Banner: React.FC<Props> = ({ banner, bannerHoverText, onBannerClick, type='large', className }) => {
    const newClassName = [
        styles['banner'], 
        type === 'small' ? styles['small'] : '', 
        className ? className : '',
        bannerHoverText ? styles['has-hover'] : ''
    ].join(' ');
    return(
        <div 
            style={{backgroundImage: `url(${getUserBanner(banner)})`}}
            className={newClassName}
            onClick={onBannerClick}
            data-hover-text={bannerHoverText}
        />
    )
}