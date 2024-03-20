import {
  boolean,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const todo_tb = mysqlTable("todo_tb", {
  id: serial("id").primaryKey(),
  todo: varchar("todo", { length: 256 }).unique().notNull(),
  isCompleted: boolean("isCompleted").notNull().default(false),
  createAt: timestamp("createAt", {
    mode: "string",
    fsp: 0,
  })
    .notNull()
    .defaultNow(),
});

// for validate the request body before request
export const insetTodo = createInsertSchema(todo_tb);

export type InsertTodo = Zod.infer<typeof insetTodo>;

// for validate the response body before response
export const selectTodo = createSelectSchema(todo_tb);

export type SelectTodo = Zod.infer<typeof selectTodo>;
