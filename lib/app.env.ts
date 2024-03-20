import { APP_ENV, APP_ENV_NAME } from "@/type";

const getSysEnv = (name: APP_ENV_NAME) => {
    const resultEnv = process.env[name.toUpperCase()];
    if (typeof resultEnv === "undefined") {
        throw new Error(`enviroment variable is not found!`, {
            cause: `${name.toUpperCase()} is not found!`,
        });
    }
    return resultEnv;
};

export const AppEnv: APP_ENV = {
    db_user: getSysEnv("db_user"),
    db_password: getSysEnv("db_password"),
    db_host: getSysEnv("db_host"),
    db_name: getSysEnv("db_name"),
};
