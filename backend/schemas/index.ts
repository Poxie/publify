import { gql } from "apollo-server";

export const typeDefs = gql`
    type CustomAbout {
        userId: String!
        emoji: String!
        label: String!
        value: String!
        type: String!
        id: String!
    }
    type User {
        id: String!
        username: String!
        email: String
        emailVerified: Boolean
        displayName: String!
        avatar: String
        banner: String
        posts: [Post]!
        bio: String
        color: String!
        followersCount: Int!
        isFollowing: Boolean
        postCount: Int!
        location: String
        education: String
        relationship: String
        customAbouts: [CustomAbout]
        emailNotifications: Boolean
    }
    type Post {
        id: String!
        content: String!
        authorId: String!
        author: User!
        createdAt: String!
        likes: [String]!
        isLiked: Boolean!
        likeCount: Int!
        media: [Media]!
        comments: [Comment]!
        commentCount: Int!
    }
    type Media {
        id: String!
        parentId: String!
        authorId: String!
        width: Int
        height: Int
        ratio: Float
    }
    type Comment {
        id: String!
        parentId: String!
        parent: Post!
        content: String!
        authorId: String!
        author: User!
        createdAt: String!
        replies: [Comment]!
        likes: [String]!
        likeCount: Int!
    }
    type Notification {
        id: String!
        userId: String!
        authorId: String!
        author: User!
        type: String!
        content: String!
        createdAt: String!
        read: Boolean!
        targetId: String
        image: String
    }

    type AuthData {
        token: String!
        user: User!
    }

    # Root Query Type
    type Query {
        getMe: User
        getUserByUsername(username: String!): User
        getUserById(id: String!): User
        getPostById(id: String!): Post
        getUserMedia(id: String!, startIndex: Int, endIndex: Int): [Media]
        getPostsByAuthorId(id: String!, startIndex: Int, endIndex: Int): [Post]
        getCommentsByParentId(parentId: String!): [Comment]!
        getMyNotifications(startIndex: Int, endIndex: Int): [Notification]!
        getMyNotificationCount: Int!
        getMyFeed: [Post]!
        getExploreUsers: [User]!
        getExplorePosts: [Post]!
        getAutoCompletedUsers(query: String!): [User]!
        login(username: String!, password: String!): AuthData!
    }

    scalar Upload
    # Mutations
    type Mutation {
        register(
            username: String!
            displayName: String! 
            password: String!
            bio: String 
            avatar: Upload
            banner: Upload
        ): User
        
        # Post stuff
        createLike(parentId: String!): Post!
        destroyLike(parentId: String!): Post!
        destroyPost(postId: String!): Boolean
        createPost(content: String!, media: [Upload]): Post!
        createComment(parentId: String!, content: String!): Comment!
        destroyComment(id: String!): Boolean!

        # Profile stuff
        updateProfile(
            username: String
            email: String
            currentPassword: String
            password: String
            displayName: String
            bio: String
            avatar: Upload
            banner: Upload
            location: String
            education: String
            relationship: String
            emailNotifications: Boolean
        ): User
        updateCustomAbout(
            id: String!
            label: String
            emoji: String
            value: String
        ): Boolean
        createCustomAbout(
            label: String!
            emoji: String!
            value: String!
        ): CustomAbout
        destroyCustomAbout(
            id: String!
        ): Boolean
        createFollow(
            userId: String!
        ): Boolean
        destroyFollow(
            userId: String!
        ): Boolean

        # Notifications stuff
        readMyNotifications: Boolean
    }
`