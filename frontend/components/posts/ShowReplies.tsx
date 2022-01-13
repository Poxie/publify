import React from 'react';
import styles from '../../styles/Post.module.scss';
import { CurvedArrowIcon } from '../../icons/CurvedArrowIcon';
import { Flex } from '../Flex';

type Props = {
    replies: number;
    toggle: () => void;
}
export const ShowReplies: React.FC<Props> = ({ replies, toggle }) => {
    return(
        <Flex 
            alignItems={'center'} 
            className={styles['show-replies']}
            onClick={toggle}
        >
            <CurvedArrowIcon />
            Show {replies} {replies > 1 ? 'replies' : 'reply'}
        </Flex>
    )
}