import {ConfigDev} from "./src/config/Config.dev";
export default {
    synchronize: false,
    logging: false,
    entities: ["./src/**/entities/**/*.{ts,js}"],
    migrations: ["./src/database/migrations/*.{ts,js}"],
    migrationsRun: false,
    cli: {
        migrationsDir: "./src/database/migrations",
    },
    ...ConfigDev.db.sqlMigrations,
};
