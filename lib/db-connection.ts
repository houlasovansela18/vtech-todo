import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import { AppEnv } from "./app.env";

export const connection = mysql.createPool({
    host: AppEnv.db_host,
    user: AppEnv.db_user,
    password: AppEnv.db_password,
    database: AppEnv.db_name,
    multipleStatements: true,
});
export const db = drizzle(connection, {
    schema,
    mode: "default",
});
