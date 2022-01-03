import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schemas';
import { Query } from './resolvers/Query';
import { Post } from './resolvers/Post';
import { User } from './resolvers/User';
import { initializeConnection } from './logic/connection';
import dotenv from 'dotenv';
dotenv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Post,
        User
    }
});

// Initializing MySQL connection
export const connection = initializeConnection();

server.listen({ port: 5000 }).then(() => console.log('Server is running.'));