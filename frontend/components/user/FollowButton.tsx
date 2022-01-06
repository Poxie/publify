import React from 'react';
import { Button } from '../Button';

interface Props {
    userId: string;
}
export const FollowButton: React.FC<Props> = ({ userId }) => {
    // Do some logic with userId later
    return(
        <Button>
            Follow
        </Button>
    )
}