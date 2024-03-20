"use server";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { AppEnv } from "./app.env";
import * as schema from "./schema";

export const poolConnection = mysql.createPool({
  host: AppEnv.db_host,
  user: AppEnv.db_user,
  password: AppEnv.db_password,
  database: AppEnv.db_name,
  multipleStatements: true,
});

export const db = drizzle(poolConnection, { schema, mode: "default" });
