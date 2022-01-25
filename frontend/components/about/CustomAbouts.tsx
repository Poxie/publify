import React from 'react';
import { CustomAbout } from '../../utils/types';
import { AboutItem } from './AboutItem';

type Props = {
    customAbouts: CustomAbout[];
}
export const CustomAbouts: React.FC<Props> = ({ customAbouts }) => {
    return(
        <>
            {customAbouts.map(customAbout => {
                const { label, type, value, emoji } = customAbout;

                return(
                    <AboutItem 
                        label={label}
                        type={type}
                        value={value}
                        emoji={emoji}
                    />
                )
            })}
        </>
    )
}