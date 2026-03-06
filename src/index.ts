import express from 'express'
import { Request, Response } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
async function init() {
    const app = express();
    const port = Number(process.env.PORT || 3000)
    app.use(express.json());

    //create graphql server
    const gqlServer: any = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
                say(name: String): String
            }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey there I am graphql server`,
                say: (_, {name}) => ` Hey ${name}, How are you ?` 

            }
        }
    });

    await gqlServer.start();

    app.get('/', (req: Request, res: Response) => {
        res.json({ message: 'server is up and running' });
    })

    app.use("/graphql" , expressMiddleware(gqlServer))

    app.listen(port, () => console.log(`Server is running on ${port}`));
}
init();


