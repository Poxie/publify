import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectPostById } from '../../redux/selectors';
import { PartialPost } from '../PartialPost';

type Props = {
    postId: string;
}
export const ProfilePost: React.FC<Props> = ({ postId }) => {
    // Getting post
    const post = useAppSelector(state => selectPostById(state, postId));

    return(
        <PartialPost {...post} />
    )
}