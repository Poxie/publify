import { gql } from "apollo-server";

export const typeDefs = gql`
    type User {
        name: String!
        avatar: String
        posts: [Post]!
    }
    type Post {
        id: String!
        content: String!
        authorId: Int!
        author: User!
        timestamp: Int!
    }

    # Root Query Type
    type Query {
        getUserById(id: String!): User
        getPostById(id: String!): Post
    }
`