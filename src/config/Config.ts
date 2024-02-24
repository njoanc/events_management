import {ConfigDev} from "./Config.dev";
import {ConfigLocal} from "./Config.local";
import {ConfigProd} from "./Config.prod";
import {ConfigStaging} from "./Config.staging";
import {ConfigTests} from "./Config.tests";
import {IConfig} from "./IConfig";

const configs: {[key: string]: IConfig} = {
    dev: ConfigDev,
    staging: ConfigStaging,
    production: ConfigProd,
    test: ConfigTests,
    local: ConfigLocal,
};

const env = process.env.NODE_ENV || "local";
const config = configs[env];
export {config as Config};
