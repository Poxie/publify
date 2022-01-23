import React from 'react';
import styles from '../../../styles/Settings.module.scss';
import { PlusIcon } from '../../../icons/PlusIcon';
import { Flex } from '../../Flex';

type Props = {
    type: 'education' | 'location' | 'custom';
    onClick: () => void;
}
export const AddAboutItem: React.FC<Props> = ({ type, onClick }) => {
    return(
        <Flex 
            onClick={onClick} 
            alignItems={'center'}
            className={styles['add-about-item']}
        >
            <PlusIcon />
            <span>
                Add {type}
            </span>
        </Flex>
    )
}