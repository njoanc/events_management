import {ApolloServer, ServerRegistration} from "apollo-server-express";
import "dotenv/config";
import express, {Application} from "express";
import {graphqlUploadExpress} from "graphql-upload";
import {createServer} from "http";
import "reflect-metadata";
import {Config} from "../config/Config";
import {createDB} from "../database/databaseConnection";
import {graphqlSchema} from "../graphql/graphqlSchema";
import {buildServerOptionsGraphQL} from "./serverOptions";

const main = async () => {
    // Db and dependencies initialization
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const [_db, schema] = await Promise.all([createDB(), graphqlSchema(Config.local)]);

    // GraphQL initialization
    const serverOptions = await buildServerOptionsGraphQL(schema);
    const server = new ApolloServer(serverOptions);

    // Express initialization
    const app: Application = express();

    // Middlewares
    app.use(express.json());
    app.use(graphqlUploadExpress({maxFileSize: 100_000_000, maxFiles: 10}));

    const httpServer = createServer(app);

    // Start server
    await server.start();

    // Use RequestHandler type for applyMiddleware
    server.applyMiddleware({app} as ServerRegistration);

    const port = process.env.PORT || 3333;

    httpServer.listen({port}, () => {
        console.log(`GraphQL server ready and listening at ==> http://localhost:${port}${server.graphqlPath}`);
    });
};

main().catch((error) => {
    console.log(error, "error");
});
