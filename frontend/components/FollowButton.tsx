import { useTranslation } from 'next-i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../contexts/ModalProvider';
import { LoginModal } from '../modals/login/LoginModal';
import { createFollowAction, destroyFollowAction } from '../redux/actions';
import { createFollow, destroyFollow } from '../utils';
import { isAuthError } from '../utils/errors';
import { Button } from './Button';

interface Props {
    userId: string;
    isFollowing: boolean;
}
export const FollowButton: React.FC<Props> = ({ userId, isFollowing }) => {
    const { t } = useTranslation();
    const { setModal } = useModal();
    const dispatch = useDispatch();

    const onClick = async () => {
        if(isFollowing) {
            await destroyFollow(userId);
            dispatch(destroyFollowAction());
        } else {
            const response = await createFollow(userId).catch(error => {
                if(isAuthError(error)) {
                    setModal(<LoginModal />)
                }
            });
            if(!response) return;

            dispatch(createFollowAction());
        }
    }

    return(
        <Button 
            type={isFollowing ? 'secondary' : 'primary'}
            onClick={onClick}
        >
            {isFollowing ? (
                t('unfollow')
            ) : (
                t('follow')
            )}
        </Button>
    )
}