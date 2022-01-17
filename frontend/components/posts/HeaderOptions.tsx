import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider';
import { OptionsIcon } from '../../icons/OptionsIcon';
import { removePost } from '../../redux/actions';
import { Options } from '../Options';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost } from '../../redux/selectors';
import { useTranslation } from 'next-i18next';

type Item = {
    text: string;
    onClick: () => void;
    type: 'default' | 'danger';
}

export const HeaderOptions = () => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();
    const { author, id: postId } = useAppSelector(state => selectActivePost(state));
    const { id: authorId } = author;
    const router = useRouter();
    const { user } = useAuth();
    const [items, setItems] = useState<Item[]>([{text: t('reportPost'), type: 'danger', onClick: () => {}}]);

    useEffect(() => {
        // If user is author, show delete option
        if(user?.id === authorId) {
            items.unshift({text: t('deletePost'), type: 'danger', onClick: deletePost});
        }
    }, [user]);

    // Deleting post
    const deletePost = () => {
        dispatch(removePost(postId));
        router.push(`/${user.username}`)
    }

    return(
        <div style={{position: 'relative'}}>
            <Options 
                items={items}
            >
                <OptionsIcon />
            </Options>
        </div>
    )
}