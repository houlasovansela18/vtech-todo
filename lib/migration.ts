import "dotenv/config";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { db, connection } from "./db-connection";

migrate(db, { migrationsFolder: "./lib/drizzle" })
    .then(() => {
        console.log("Completed migration!");
    })
    .catch(() => {
        console.log("Unable to migrate database!");
    })
    .finally(() => {
        connection.end();
    });
