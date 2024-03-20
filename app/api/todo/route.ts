import { insetTodo } from "@/lib/schema";
import { ZodError } from "zod";

import { db } from "@/lib/db-connection";
import { todo_tb } from "@/lib/schema";

export async function GET() {
    try {
        const todo = await db.select().from(todo_tb);
        return Response.json({ status: "success", data: todo });
    } catch (error) {
        return Response.json({
            status: "error",
            message: (error as Error).message,
        });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const insertData = insetTodo.parse(body);
        const inserted = await db.insert(todo_tb).values(insertData);
        return Response.json({ status: "success", data: inserted });
    } catch (error) {
        if (error instanceof ZodError) {
            return Response.json({
                status: "error",
                data: error.issues,
            });
        }
        return Response.json({
            status: "error",
            message: (error as Error).message,
        });
    }
}
