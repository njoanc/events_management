import {ConnectionOptions} from "typeorm/connection/ConnectionOptions";

interface IConfig {
    local: boolean;
    production: boolean;
    db: DbConfig;
    jwtSecret: string;
    aws: AWSConfig;
}

export interface DbConfig {
    sql: ConnectionOptions;
    sqlMigrations: ConnectionOptions;
}
export interface AWSConfig {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
}

export {IConfig};
