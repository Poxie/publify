import { gql } from "apollo-server";

export const typeDefs = gql`
    type User {
        id: String!
        username: String!
        displayName: String!
        avatar: String
        banner: String
        posts: [Post]!
        bio: String
    }
    type Post {
        id: String!
        content: String!
        authorId: String!
        author: User!
        createdAt: String!
        likes: [String]!
        likeCount: Int!
        media: [Media]!
        comments: [Comment]!
        commentCount: Int!
    }
    type Media {
        id: String!
        parentId: String!
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
    

    type AuthData {
        token: String!
        user: User!
    }

    # Root Query Type
    type Query {
        getMe: User
        getUserById(id: String!): User
        getPostById(id: String!): Post
        getPostsByAuthorId(id: String!, startIndex: Int, endIndex: Int): [Post]
        getCommentsByParentId(parentId: String!): [Comment]!
        login(username: String!, password: String!): AuthData!
    }

    scalar Upload
    # Mutations
    type Mutation {
        register(
            username: String!, 
            displayName: String! 
            password: String!, 
            avatar: String, 
            banner: String
        ): User
        
        # Post stuff
        createLike(parentId: String!): Post!
        destroyLike(parentId: String!): Post!
        destroyPost(postId: String!): Boolean
        createPost(content: String!, media: [Upload]): Post!
        createComment(parentId: String!, content: String!): Comment!
        destroyComment(id: String!): Boolean!

        # Profile stuff
        updateProfile(username: String, displayName: String, bio: String, avatar: Upload, banner: Upload): User
    }
`