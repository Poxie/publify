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
        media: [Media]!
    }
    type Media {
        id: String!
        url: String!
    }

    # Root Query Type
    type Query {
        getUserById(id: String!): User
        getPostById(id: String!): Post
        getPostsByAuthorId(id: String!): [Post]
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
    }
`