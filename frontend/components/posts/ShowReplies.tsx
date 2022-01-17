import React from 'react';
import styles from '../../styles/Post.module.scss';
import { CurvedArrowIcon } from '../../icons/CurvedArrowIcon';
import { Flex } from '../Flex';
import { useTranslation } from 'next-i18next';

type Props = {
    replies: number;
    toggle: () => void;
}
export const ShowReplies: React.FC<Props> = ({ replies, toggle }) => {
    const { t } = useTranslation('post');
    return(
        <Flex 
            alignItems={'center'} 
            className={styles['show-replies']}
            onClick={toggle}
        >
            <CurvedArrowIcon />
            {t('showReplies', { replyAmount: replies })}
        </Flex>
    )
}