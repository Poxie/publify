import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export const getWindowDimensions = () => ({ width: window.innerWidth, height: window.innerHeight });

export const useDimensions = () => {
    const [dimensions, setDimensions] = useState(typeof window !== 'undefined' && getWindowDimensions());

    useEffect(() => {
        const update = () => setDimensions(getWindowDimensions());

        window.addEventListener('resize', update);

        return () => window.removeEventListener('resize', update);
    }, []);

    return dimensions;
}