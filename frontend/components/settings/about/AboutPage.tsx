import React from 'react';
import { SettingsMain } from '../SettingsMain';
import { AboutInput } from './AboutInput';

export const AboutPage = () => {
    return(
        <SettingsMain title={'About'}>
            <AboutInput 
                type={'location'}
                label={'Location'}
            />
            <AboutInput 
                label={'Education'}
                type={'education'}
            />
        </SettingsMain>
    )
}