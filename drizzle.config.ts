import type { Config } from "drizzle-kit";
import { AppEnv } from "./lib/app.env";

export default {
  schema: "./lib/schema.ts",
  out: "./lib/drizzle",
  driver: "mysql2",
  dbCredentials: {
    host: AppEnv.db_host,
    user: AppEnv.db_user,
    password: AppEnv.db_password,
    database: AppEnv.db_name,
  },
  breakpoints: true,
} satisfies Config;
