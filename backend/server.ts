import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas';
import { Query } from './resolvers/Query';
import { Post } from './resolvers/Post';
import { User } from './resolvers/User';
import { initializeConnection } from './logic/connection';
import dotenv from 'dotenv';
import { Mutation } from './resolvers/Mutation';
import { isAuth } from './middleware/is-auth';
dotenv.config();

// Initializing MySQL connection
export const connection = initializeConnection();

const app = express();
// @ts-ignore
app.use(isAuth);

(async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            Query,
            Post,
            User,
            Mutation
        },
        context: (context) => {
            const req: any = context.req;
            
            return {
                userId: req.userId,
                isAuth: req.isAuth
            }
        }
    });

    // Starting apollo server
    await server.start();
    
    // @ts-ignore
    server.applyMiddleware({ app, isAuth });
    app.listen({ port: 5000 }, () => console.log('Server is running.'));
})();