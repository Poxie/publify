import { useTranslation } from 'next-i18next';
import React from 'react';
import { Button } from '../Button';

interface Props {
    userId: string;
}
export const FollowButton: React.FC<Props> = ({ userId }) => {
    const { t } = useTranslation();
    // Do some logic with userId later
    return(
        <Button>
            {t('follow')}
        </Button>
    )
}