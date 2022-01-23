import { useTranslation } from 'next-i18next';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileUser } from '../../redux/selectors';
import { AboutItem } from './AboutItem';

export const AboutPage = () => {
    const { t } = useTranslation();
    const { relationship, education, location } = useAppSelector(state => selectProfileUser(state));

    return(
        <div>
            <AboutItem 
                label={t('locationLabel')}
                type={'location'}
                value={location}
            />
            <AboutItem 
                label={t('educationLabel')}
                type={'education'}
                value={education}
            />
            <AboutItem 
                label={t('relationshipLabel')}
                type={'relationship'}
                value={t(relationship)}
            />
        </div>
    )
}