import { getPostById, getUserById } from "../logic/db-actions";

export const users = [{id: "1", name: 'Poxen', avatar: 'hello'}, {id: "2", name: 'Marre', avatar: 'Hello2'}];
export const posts = [{id: "1", content: 'Posty1', authorId: "1"}, {id: "2", content: "post 24", authorId: "1"}, {id: "3", content: 'Post 3', authorId: "2"}]

export const Query = {
    getUserById: async (parent: any, args: any) => {
        const userId = args.id;
        const user = await getUserById(userId);
        return user;
    },
    getPostById: async (parent: any, args: any) => {
        const id = args.id;
        const post = await getPostById(id);
        return post;
    }
}