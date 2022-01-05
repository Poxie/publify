import { gql } from "apollo-server";

export const typeDefs = gql`
    type User {
        id: String!
        name: String!
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
    }

    # Root Query Type
    type Query {
        getUserById(id: String!): User
        getPostById(id: String!): Post
        getPostsByAuthorId(id: String!): [Post]
    }

    # Mutations
    type Mutation {
        register(username: String!, password: String!, avatar: String, banner: String): User
    }
`