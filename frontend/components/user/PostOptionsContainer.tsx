import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider';
import { OptionsIcon } from '../../icons/OptionsIcon';
import { removePost } from '../../redux/actions';
import { Options } from '../Options';

type Item = {
    text: string;
    type: 'danger' | 'default';
    onClick: () => void;
}
type Props = {
    authorId: string;
    postId: string;
}
export const PostOptionsContainer: React.FC<Props> = ({ authorId, postId }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [items, setItems] = useState<Item[]>([{text: t('reportPost'), type: 'danger', onClick: () => {}}]);

    useEffect(() => {
        // If user is author, show delete option
        if(user?.id === authorId && !items.map(item => item.text).includes(t('deletePost'))) {
            items.unshift({text: t('deletePost'), type: 'danger', onClick: deletePost});
        }
    }, [user]);

    // Deleting post
    const deletePost = () => {
        dispatch(removePost(postId));
    }

    return(
        <div style={{position: 'relative', zIndex: 15}}>
            <Options 
                items={items}
            >
                <OptionsIcon />
            </Options>
        </div>
    )
}