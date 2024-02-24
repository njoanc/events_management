import dotenv from "dotenv";
import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";
import {AWSConfig, IConfig} from "./IConfig";
dotenv.config();

const dbConnectionOptions: ConnectionOptions = {
    type: "mysql",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: 3306,
    username: process.env.MYSQL_DATABASE_USER || "root",
    password: process.env.MYSQL_DATABASE_PASSWORD || "Password",
    database: process.env.MYSQL_DATABASE_NAME || "ccEvents",
};
const awsConfig: AWSConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    region: process.env.AWS_S3_REGION || "",
    bucket: process.env.AWS_S3_BUCKET || "",
};
class ConfigProd implements IConfig {
    local = false;
    production = true;
    db = {sql: dbConnectionOptions, sqlMigrations: dbConnectionOptions};
    jwtSecret = process.env.SECRET_KEY || "secretKey";
    aws = awsConfig;
}

const config = new ConfigProd();
export {config as ConfigProd};
