import React from 'react';
import styles from '../../styles/RegisterModal.module.scss';
import { Flex } from '../../components/Flex';
import { useModal } from '../../contexts/ModalProvider';
import { ModalFooter } from '../ModalFooter';
import { Button } from '../../components/Button';
import { useTranslation } from 'next-i18next';

type Props = {
    onCreate: () => void;
}
export const RegisterDetailsFooter: React.FC<Props> = ({ onCreate }) => {
    const { t } = useTranslation();
    const { goBack } = useModal();

    return(
        <ModalFooter>
            <Flex 
                justifyContent={'space-between'}
                alignItems={'center'}
                className={styles['footer']}
            >
                <span onClick={goBack}>
                    {t('goBack')}
                </span>
                <Button onClick={onCreate}>
                    {t('create')}
                </Button>
            </Flex>
        </ModalFooter>
    )
}