import "reflect-metadata";
import {createConnection, useContainer} from "typeorm";
import {Container} from "typeorm-typedi-extensions";
import {ConfigDev} from "../config/Config.dev";
import {ConfigTests} from "../config/Config.tests";

export const createDB = async () => {
    // Choose the appropriate database configuration based on NODE_ENV
    const options =
        process.env.NODE_ENV === "test"
            ? {
                  synchronize: true,
                  logging: false,
                  entities: ["./src/**/entities/**/*.{ts,js}"],
                  dropSchema: true,
                  ...ConfigTests.db.sql,
              }
            : {
                  synchronize: false,
                  logging: false,
                  entities: ["./src/**/entities/**/*.{ts,js}"],
                  migrations: ["./src/database/migrations/*.{ts,js}"],
                  migrationsRun: false,
                  bigNumberStrings: false,
                  ...ConfigDev.db.sql,
              };

    useContainer(Container);

    return createConnection(options);
};
