import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";
import {ApolloServerPlugin} from "apollo-server-plugin-base";
import express from "express";
import {GraphQLSchema} from "graphql";
import {Config} from "../config/Config";

export const buildServerOptionsGraphQL = async (schema: GraphQLSchema) => {
    const plugins: ApolloServerPlugin[] = [];
    if (!Config.production) {
        plugins.push(ApolloServerPluginLandingPageGraphQLPlayground());
    }

    return {
        schema,
        plugins,
        /* eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
        context: ({event, express, req}: {event: any; express: express.Express; req: express.Request}) => ({
            headers: event?.headers || req.headers,
        }),
        debug: !Config.production,
        introspection: true,
    };
};

export type ApiContext = {
    headers: {[key: string]: string | undefined};
};
