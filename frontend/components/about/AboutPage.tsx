import React from 'react';
import styles from '../../styles/User.module.scss';
import { useTranslation } from 'next-i18next';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileUser } from '../../redux/selectors';
import { AboutItem } from './AboutItem';
import { CustomAbouts } from './CustomAbouts';

export const AboutPage = () => {
    const { t } = useTranslation();
    const { relationship, education, location, customAbouts } = useAppSelector(state => selectProfileUser(state));

    const noItems = (!relationship || relationship === 'relationshipN/A') && !education && !location;
    return(
        <div>
            {location && (
                <AboutItem 
                    label={t('locationLabel')}
                    type={'location'}
                    value={location}
                />
            )}
            {education && (
                <AboutItem 
                    label={t('educationLabel')}
                    type={'education'}
                    value={education}
                />
            )}
            {relationship && relationship !== 'relationshipN/A' && (
                <AboutItem 
                    label={t('relationshipLabel')}
                    type={'relationship'}
                    value={t(relationship)}
                />
            )}
            {noItems && (
                <div className={styles['empty']}>
                    <span>
                        {t('aboutMeEmpty')}
                    </span>
                </div>
            )}
            {customAbouts.length !== 0 && (
                <CustomAbouts 
                    customAbouts={customAbouts}
                />
            )}
        </div>
    )
}