import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
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
import { Comment } from './resolvers/Comment';
import { Notification } from './resolvers/Notification';
import { getUserById, updateProfileProperties } from './logic/db-actions';
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
            Comment,
            Notification,
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

    // Confirming email
    app.get('/confirm/:token', async (req, res) => {
        if(!process.env.JSON_WEB_TOKEN_SECRET_KEY) return res.send('Secret key undefined.');
        const { token } = req.params;
        
        try {
            const { id, email }: any = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);
            const user = await getUserById(id);

            if(user.email === email) {
                updateProfileProperties(id, [{key: 'emailVerified', value: true}]);
                res.redirect(`${process.env.FRONTEND_ORIGIN}/success?type=email`);
            } else {
                res.redirect(`${process.env.FRONTEND_ORIGIN}/error?type=fishy`);
            }
        } catch (error) {
            res.redirect(`${process.env.FRONTEND_ORIGIN}/error?message=${error}`);
        }
    })
    
    // @ts-ignore
    server.applyMiddleware({ app, isAuth });
    app.listen({ port: 5000 }, () => console.log('Server is running.'));
})();