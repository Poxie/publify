import React from 'react';
import { AboutInput } from './AboutInput';
import { MapItem } from './AboutPage';
import { AddAboutItem } from './AddAboutItem';

type Props = {
    items: MapItem[];
    removeItem: (id: string) => void;
    updateItem: (item: MapItem) => void;
}
export const CustomAbouts: React.FC<Props> = ({ items, removeItem, updateItem }) => {
    const updatetChange = (item: MapItem, value: any) => {
        const newItem = {
            ...item,
            ...value
        }
        updateItem(newItem);
    }

    return(
        <div>
            {items.map((item, key) => {
                return(
                    <AboutInput 
                        {...item}
                        isCustomizable={true}
                        customizedUpdate={value => updatetChange(item, value)}
                        onRemove={() => removeItem(item.id)}
                        key={key}
                    />
                )
            })}
        </div>
    )
}