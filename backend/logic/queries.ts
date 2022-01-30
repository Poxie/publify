// Query
export const SELECT_USER_BY_ID = 'SELECT * FROM `users` WHERE id = ?';
export const SELECT_USER_BY_USERNAME = 'SELECT * FROM `users` WHERE username = ?'
export const SELECT_POST_BY_ID = 'SELECT * FROM `posts` WHERE id = ?';
export const SELECT_POSTS_BY_AUTHOR_ID = 'SELECT * FROM `posts` WHERE authorId = ? ORDER BY createdAt DESC LIMIT ?, ?';
export const SELECT_MEDIA_BY_POST_ID = 'SELECT * FROM `media` WHERE parentId = ?';
export const SELECT_MEDIA_BY_ID = 'SELECT * FROM `media` WHERE id = ?';
export const SELECT_MEDIA_BY_AUTHOR_ID = 'SELECT * FROM `media` WHERE authorId = ?'
export const SELECT_LIKES_BT_PARENT_ID = 'SELECT * FROM `likes` WHERE parentId = ?';
export const SELECT_LIKE_BY_ID = 'SELECT * FROM `likes` WHERE userId = ? AND parentId = ?';
export const SELECT_COMMENT_BY_ID = 'SELECT * FROM `comments` WHERE id = ?';
export const SELECT_COMMENTS_BY_PARENT_ID = 'SELECT * FROM `comments` WHERE parentId = ?';
export const SELECT_COMMENT_COUNT_BY_PARENT_ID = 'SELECT count(*) AS commentCount FROM `comments` WHERE parentId = ?';
export const SELECT_CUSTOM_ABOUTS = 'SELECT * FROM `about` WHERE userId = ?';
export const GET_CUSTOM_ABOUT_BY_ID = 'SELECT * FROM `about` WHERE id = ?';
export const SELECT_FOLLOWER = 'SELECT * FROM `followers` WHERE userId = ? AND followerId = ?';
export const SELECT_FOLLOWERS_COUNT = 'SELECT count(*) AS followersCount FROM `followers` WHERE userId = ?';
export const SELECT_FOLLOWERS_IDS = 'SELECT followerId FROM `followers` WHERE userId = ?';
export const SELECT_POST_COUNT = 'SELECT count(*) AS postCount FROM `posts` WHERE authorId = ?';
export const SELECT_NOTIFICATION = 'SELECT * FROM notifications WHERE id = ?';
export const SELECT_USER_NOTIFICATIONS = 'SELECT * FROM notifications WHERE userId = ?';
export const SELECT_USER_NOTIFICATION_COUNT = 'SELECT count(*) AS notificationCount FROM `notifications` WHERE userId = ? AND `read` = 0';
export const SELECT_MOST_FOLLOWERS = 'SELECT userId, COUNT(*) AS magnitude FROM followers GROUP BY userId ORDER BY magnitude DESC LIMIT 10';
export const SELECT_MOST_LIKES = 'SELECT parentId, COUNT(*) AS magnitude FROM likes GROUP BY parentId ORDER BY magnitude DESC LIMIT 10';
export const SELECT_LIKE_USERS = 'SELECT * FROM users WHERE displayName LIKE ? OR username LIKE ? LIMIT 6'

// Insertions
export const INSERT_USER = 'INSERT INTO `users` (id, username, password, displayName, avatar, banner, color) VALUES (?, ?, ?, ?, ?, ?, ?)';
export const INSERT_LIKE = 'INSERT INTO `likes` (userId, parentId) VALUES (?, ?)';
export const INSERT_POST = 'INSERT INTO `posts` (id, authorId, content, createdAt) VALUES (?, ?, ?, ?)';
export const INSERT_COMMENT = 'INSERT INTO `comments` (id, parentId, authorId, content, createdAt) VALUES (?, ?, ?, ?, ?)';
export const INSERT_MEDIA = 'INSERT INTO `media` (id, parentId, width, height, ratio) VALUES (?, ?, ?, ?, ?)';
export const INSERT_CUSTOM_ABOUT = 'INSERT INTO `about` (id, userId, label, value, emoji) VALUES (?, ?, ?, ?, ?)';
export const INSERT_FOLLOW = 'INSERT INTO `followers` (userId, followerId, createdAt) VALUES (?, ?, ?)';
export const INSERT_NOTIFICATION = 'INSERT INTO `notifications` (id, userId, authorId, type, content, createdAt, image, targetId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

// Deleteions
export const DELETE_LIKE = 'DELETE FROM `likes` WHERE parentId = ? AND userId = ?';
export const DELETE_POST = 'DELETE FROM `posts` WHERE id = ?';
export const DELETE_COMMENT = 'DELETE FROM `comments` WHERE id = ?';
export const DELETE_CUSTOM_ABOUT = 'DELETE FROM `about` WHERE id = ?';
export const DELETE_FOLLOW = 'DELETE FROM `followers` WHERE userId = ? AND followerId = ?';

// Updates
export const UPDATE_NOTIFICATION_STATUS = 'UPDATE notifications SET `read` = ? WHERE userId = ?';