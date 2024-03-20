import { db } from "@/lib/db-connection";
import { insetTodo, todo_tb } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function PATCH(req: Request) {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").reverse()[0];
    const body = await req.json();
    const insertData = insetTodo.parse(body);
    const response = await db
        .update(todo_tb)
        .set(insertData)
        .where(eq(todo_tb.id, parseInt(id)));
    return Response.json({
        status: "success",
        data: response,
    });
}

export async function DELETE(req: Request) {
    try {
        const { pathname } = new URL(req.url);
        const id = pathname.split("/").reverse()[0];
        const response = await db
            .delete(todo_tb)
            .where(eq(todo_tb.id, parseInt(id)));
        return Response.json({
            status: "success",
            data: response,
        });
    } catch (error) {
        return Response.json({
            status: "error",
            message: (error as Error).message,
        });
    }
}
