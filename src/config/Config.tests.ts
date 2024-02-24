import dotenv from "dotenv";
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";
import {AWSConfig, IConfig} from "./IConfig";
dotenv.config();

const dbConnectionOptions: ConnectionOptions = {
    type: "sqlite",
    database: ":memory:",
    synchronize: true,
    migrationsRun: false,
    migrations: [],
};

const awsConfig: AWSConfig = {
    accessKeyId: "access key",
    secretAccessKey: "secret key",
    region: "us-east-1",
    bucket: "ccevents",
};

class ConfigTests implements IConfig {
    local = false;
    production = false;
    db = {sql: dbConnectionOptions, sqlMigrations: dbConnectionOptions};
    aws = awsConfig;
    jwtSecret = process.env.SECRET_KEY || "secretKey";
}

const config = new ConfigTests();
export {config as ConfigTests};
