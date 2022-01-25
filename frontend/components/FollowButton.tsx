import { useTranslation } from 'next-i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { createFollowAction, destroyFollowAction } from '../redux/actions';
import { createFollow, destroyFollow } from '../utils';
import { Button } from './Button';

interface Props {
    userId: string;
    isFollowing: boolean;
}
export const FollowButton: React.FC<Props> = ({ userId, isFollowing }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onClick = async () => {
        if(isFollowing) {
            await destroyFollow(userId);
            dispatch(destroyFollowAction());
        } else {
            await createFollow(userId);
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