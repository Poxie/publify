import { gql } from "apollo-server";

export const typeDefs = gql`
    type User {
        id: String!
        username: String!
        displayName: String!
        avatar: String
        banner: String
        posts: [Post]!
    }
    type Post {
        id: String!
        content: String!
        authorId: Int!
        author: User!
        timestamp: Int!
        likes: [String]!
        likeCount: Int!
        media: [Media]!
    }
    type Media {
        id: String!
        url: String!
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
        getPostsByAuthorId(id: String!): [Post]
        login(username: String!, password: String!): AuthData!
    }

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
        createLike(postId: String!): Post!
        destroyLike(postId: String!): Post!
        destroyPost(postId: String!): Boolean
    }
`