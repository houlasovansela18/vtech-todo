import { AppEnv } from "@/lib/app.env";

export async function GET() {
  return Response.json({ data: "hello", db_name: AppEnv.db_user });
}

export async function POST() {
  return Response.json({ data: "hello" });
}

export async function DELETE() {
  return Response.json({ data: "hello" });
}

export async function PATCH() {
  return Response.json({ data: "hello" });
}
