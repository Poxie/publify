import React from 'react';
import styles from '../styles/PartialPost.module.scss';
import { useAuth } from '../contexts/AuthProvider';
import { OptionsIcon } from '../icons/OptionsIcon';
import { useAppSelector } from '../redux/hooks';
import { selectPostById } from '../redux/selectors';
import { Options, OptionsItem } from './Options';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removePost } from '../redux/actions';

export const PartialPostOptions: React.FC<{postId: string, authorId: string}> = ({ postId, authorId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const isAuthor = user?.id === authorId;

    // Deleting post
    const _delete = () => {
        dispatch(removePost(postId));
    }
    
    // Determining items to show in popout
    const items: OptionsItem[] = [{text: 'Report', type: 'danger', onClick: () => {}}];
    if(isAuthor) {
        items.push({text: 'Delete', type: 'danger', onClick: _delete});
    }

    // Listening for popout open change
    const onActiveChange = (state: boolean) => {
        setIsOpen(state);
    }

    const className = [styles['options-container'], isOpen && styles['settings-open']].join(' ');
    return(
        <div className={className}>
            <Options items={items} onChange={onActiveChange}>
                <OptionsIcon />
            </Options>
        </div>
    )
}