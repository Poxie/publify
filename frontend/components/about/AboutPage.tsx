import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileUser } from '../../redux/selectors';
import { AboutItem } from './AboutItem';

export const AboutPage = () => {
    const { relationship, education, location } = useAppSelector(state => selectProfileUser(state));

    return(
        <div>
            <AboutItem 
                label={'Location'}
                type={'location'}
                value={location}
            />
            <AboutItem 
                label={'Education'}
                type={'education'}
                value={education}
            />
            <AboutItem 
                label={'Relationship'}
                type={'relationship'}
                value={relationship}
            />
        </div>
    )
}