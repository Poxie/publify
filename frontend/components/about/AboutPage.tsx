import React from 'react';
import styles from '../../styles/User.module.scss';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileUser } from '../../redux/selectors';
import { AboutItem } from './AboutItem';
import { CustomAbouts } from './CustomAbouts';

type AboutItem = {
    type: string;
    label: string;
    value: string;
    emoji?: string;
}
export const AboutPage = () => {
    const { t } = useTranslation();
    const { relationship, education, location, customAbouts } = useAppSelector(state => selectProfileUser(state));

    const items: AboutItem[] = [
        {type: 'relationship', value: t(relationship), label: t('relationshipLabel')}, 
        {type: 'education', value: education, label: t('educationLabel')}, 
        {type: 'location', value: location, label: t('locationLabel')}, 
        ...customAbouts
    ];
    const itemsToMap = items.filter(item => {
        if(!item.value || item.type === 'relationship' && item.value === t('relationshipN/A')) {
            return null;
        }
        return item;
    })
    return(
        <>
            {itemsToMap.map(item => {
                return(
                    <AboutItem 
                        {...item}
                        key={item.type}
                    />
                )
            })}
            {!itemsToMap.length && (
                <div className={styles['empty']}>
                    <span>
                        {t('aboutMeEmpty')}
                    </span>
                </div>
            )}
        </>
    )
}