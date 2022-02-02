import React from 'react';
import styles from '../../../styles/Settings.module.scss';
import { Flex } from '../../Flex';
import { Slider } from '../../Slider';

type Props = {
    title: string;
    subtitle: string;
    type: 'email';
    value: boolean;
    onChange: (type: Props['type'], state: boolean) => void;
}
export const NotificationType: React.FC<Props> = ({ title, subtitle, type, value, onChange }) => {
    return(
        <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Flex flexDirection={'column'}>
                <span className={styles['notification-title']}>
                    {title}
                </span>
                <span className={styles['notification-subtitle']}>
                    {subtitle}
                </span>
            </Flex>
            <Slider 
                active={value}
                onChange={state => onChange(type, state)}
            />
        </Flex>
    )
}