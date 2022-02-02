import { gql } from "graphql-request";
import { USER_PROPERTIES } from "./queries";

export const CREATE_POST = gql`
    mutation($content: String!, $media: [Upload]) {
        createPost(content: $content, media: $media) {
            id
            content
            likes
            likeCount
            commentCount
            createdAt
            author {
                id
                avatar
                displayName
                username
            }
            media {
                id
                parentId
                width
                height
                ratio
            }
        }
    }
`

export const DESTROY_POST = gql`
    mutation($postId: String!) {
        destroyPost(postId: $postId)
    }
`

export const DESTROY_LIKE = gql`
    mutation($parentId: String!) {
        destroyLike(parentId: $parentId) {
            content
        }
    }
`

export const CREATE_LIKE = gql`
    mutation($parentId: String!) {
        createLike(parentId: $parentId) {
            content
        }
    }
`

export const CREATE_COMMENT = gql`
    mutation($parentId: String!, $content: String!) {
        createComment(parentId: $parentId, content: $content) {
            id
            content
            createdAt
            parentId
            likes
            likeCount
            author {
                id
                avatar
                username
                displayName
            }
            replies {
                id
                parentId
                content
                createdAt
                author {
                    id
                    avatar
                    username
                    displayName
                }
            }
        }
    }
`

export const DESTROY_COMMENT = gql`
    mutation($id: String!) {
        destroyComment(id: $id)
    }
`

export const CREATE_USER = gql`
    mutation($username: String!, $password: String!, $displayName: String!, $bio: String, $avatar: Upload, $banner: Upload) {
        register(username: $username, password: $password, displayName: $displayName, bio: $bio, avatar: $avatar, banner: $banner) {
            id,
            username,
            displayName,
            bio,
            avatar,
            banner
        }
    }
`

export const UPDATE_PROFILE = gql`
    mutation(
        $username: String, 
        $email: String, 
        $password: String, 
        $currentPassword: String, 
        $displayName: String, 
        $bio: String, 
        $avatar: Upload, 
        $banner: Upload, 
        $relationship: String,
        $education: String, 
        $location: String,
        $emailNotifications: Boolean
    ) {
        updateProfile(
            username: $username, 
            email: $email, 
            password: $password, 
            currentPassword: $currentPassword, 
            displayName: $displayName, 
            bio: $bio, 
            avatar: $avatar, 
            banner: $banner, 
            relationship: $relationship, 
            education: $education, 
            location: $location,
            emailNotifications: $emailNotifications
        ) {
            ${USER_PROPERTIES}
        }
    }
`

export const UPDATE_CUSTOM_ABOUT = gql`
    mutation($id: String!, $emoji: String, $label: String, $value: String) {
        updateCustomAbout(id: $id, emoji: $emoji, label: $label, value: $value)
    }
`

export const CREATE_CUSTOM_ABOUT = gql`
    mutation($emoji: String!, $label: String!, $value: String!) {
        createCustomAbout(emoji: $emoji, label: $label, value: $value) {
            id
            emoji
            label
            value
            type
            userId
        }
    }
`

export const DESTROY_CUSTOM_ABOUT = gql`
    mutation($id: String!) {
        destroyCustomAbout(id: $id)
    }
`