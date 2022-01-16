import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider';
import { OptionsIcon } from '../../icons/OptionsIcon';
import { removePost } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import styles from '../../styles/User.module.scss';
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
    const dispatch = useDispatch();
    const { user } = useAuth();
    const [items, setItems] = useState<Item[]>([{text: 'Report post', type: 'danger', onClick: () => {}}]);

    useEffect(() => {
        // If user is author, show delete option
        if(user?.id === authorId && !items.map(item => item.text).includes('Delete post')) {
            items.unshift({text: 'Delete post', type: 'danger', onClick: deletePost});
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