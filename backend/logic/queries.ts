// Query
export const SELECT_USER_BY_ID = 'SELECT * FROM `users` WHERE id = ?';
export const SELECT_USER_BY_USERNAME = 'SELECT * FROM `users` WHERE username = ?'
export const SELECT_POST_BY_ID = 'SELECT * FROM `posts` WHERE id = ?';
export const SELECT_POSTS_BY_AUTHOR_ID = 'SELECT * FROM `posts` WHERE authorId = ? ORDER BY createdAt DESC';
export const SELECT_MEDIA_BY_POST_ID = 'SELECT * FROM `media` WHERE parentId = ?';
export const SELECT_MEDIA_BY_ID = 'SELECT * FROM `media` WHERE id = ?';
export const SELECT_LIKES_BT_POST_ID = 'SELECT * FROM `likes` WHERE postId = ?';
export const SELECT_COMMENT_BY_ID = 'SELECT * FROM `comments` WHERE id = ?';
export const SELECT_COMMENTS_BY_POST_ID = 'SELECT * FROM `comments` WHERE parentId = ?';
export const SELECT_COMMENT_COUNT_BY_PARENT_ID = 'SELECT count(*) AS commentCount FROM `comments` WHERE parentId = ?';

// Insertions
export const INSERT_USER = 'INSERT INTO `users` (id, username, password, displayName, avatar, banner) VALUES (?, ?, ?, ?, ?, ?)';
export const INSERT_LIKE = 'INSERT INTO `likes` (userId, postId) VALUES (?, ?)';
export const INSERT_POST = 'INSERT INTO `posts` (id, authorId, content, createdAt) VALUES (?, ?, ?, ?)';
export const INSERT_COMMENT = 'INSERT INTO `comments` (id, parentId, authorId, content, createdAt) VALUES (?, ?, ?, ?, ?)';
export const INSERT_MEDIA = 'INSERT INTO `media` (id, parentId) VALUES (?, ?)';

// Deleteions
export const DELETE_LIKE = 'DELETE FROM `likes` WHERE postId = ? AND userId = ?';
export const DELETE_POST = 'DELETE FROM `posts` WHERE id = ?';
export const DELETE_COMMENT = 'DELETE FROM `comments` WHERE id = ?';