import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schemas';
import { Query } from './resolvers/Query';
import { Post } from './resolvers/Post';
import { User } from './resolvers/User';
import { initializeConnection } from './logic/connection';
import dotenv from 'dotenv';
import { Mutation } from './resolvers/Mutation';
import { isAuth } from './middleware/is-auth';
import { GraphQLUpload, graphqlUploadExpress } from 'graphql-upload';
dotenv.config();

// Initializing MySQL connection
export const connection = initializeConnection();

const app = express();
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));
// @ts-ignore
app.use(isAuth);

(async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            Query,
            Post,
            User,
            Mutation,
            Upload: GraphQLUpload
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

    app.use(graphqlUploadExpress({
        maxFiles: 10,
        maxFileSize: 10000000000
    }))
    
    // @ts-ignore
    server.applyMiddleware({ app, isAuth });
    app.listen({ port: 5000 }, () => console.log('Server is running.'));
})();