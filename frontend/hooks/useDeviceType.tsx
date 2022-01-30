import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getWindowDimensions, useDimensions } from './useDimensions';

export const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState<'computer' | 'tablet' | 'mobile'>('computer');

    useEffect(() => {
        const checkWidth = () => {
            const { width } = getWindowDimensions();
            if(width < 450) {
                setDeviceType('mobile')
            } else if(width < 700) {
                setDeviceType('tablet')
            } else {
                setDeviceType('computer');
            }
        }
        checkWidth();
        window.addEventListener('resize', checkWidth);

        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    return deviceType;
}