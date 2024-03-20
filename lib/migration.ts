import "dotenv/config";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { db, connection } from "./db-connection";

await migrate(db, { migrationsFolder: "./lib/drizzle" });

await connection.end();
