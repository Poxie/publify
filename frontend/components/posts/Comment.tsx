import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useRef } from 'react';
import { usePopouts } from '../../contexts/PopoutProvider';
import { HasPopout } from '../../popouts/HasPopout';
import { UserPopout } from '../../popouts/user-popout/UserPopout';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentAuthor, selectCommentById} from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { Comment as CommentType } from '../../utils/types';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { CommentMain } from './CommentMain';
import { CommentOptions } from './CommentOptions';
import { CommentReplies } from './CommentReplies';
import { CommentSettings } from './CommentSettings';

type Props = CommentType & {
    replyId?: string;
    type?: 'comment' | 'reply';
}
export const Comment: React.FC<Props> = React.memo(({ id, replyId, type='comment' }) => {
    const authorLabel = useRef<HTMLAnchorElement>(null);
    const [repliesVisible, setRepliesVisible] = useState(false);
    const comment = useAppSelector(state => selectCommentById(state, id, replyId));
    const author = comment.author;

    // Toggling replies visible
    const toggleVisible = () => {
        setRepliesVisible(previous => !previous);
    }

    const { avatar, displayName } = author;
    return(
        <div className={styles['comment']}>
            <Flex style={{position: 'relative'}}>
                <Link href={`/${author.username}`}>
                    <a ref={authorLabel}>
                        <HasPopout
                            popout={(
                                <UserPopout 
                                    {...author}
                                />
                            )}
                        >
                            <Avatar 
                                avatar={avatar}
                                name={displayName}
                                size={34}
                            />
                        </HasPopout>
                    </a>
                </Link>
                <Flex alignItems={'center'}>
                    <CommentMain 
                        commentId={id}
                        replyId={replyId}
                        type={type}
                    />
                    <CommentSettings 
                        commentId={id}
                        replyId={replyId}
                    />
                </Flex>
            </Flex>

            <CommentOptions 
                commentId={id}
                replyId={replyId}
                toggleReplies={toggleVisible}
                type={type}
            />

            {type === 'comment' && (
                <CommentReplies 
                    commentId={id}
                    visible={repliesVisible}
                    toggle={toggleVisible}
                />
            )}
        </div>
    )
});

Comment.displayName = 'Comment';