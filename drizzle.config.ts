import type { Config } from "drizzle-kit";

export default {
    schema: "./lib/schema.ts",
    out: "./lib/drizzle",
    driver: "mysql2",
    dbCredentials: {
        host: process.env.DB_HOST || "127.0.0.1",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || "todo_list",
    },
    breakpoints: true,
} satisfies Config;
