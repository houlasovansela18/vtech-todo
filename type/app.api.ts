import { AppEnvSchema } from "@/lib/zod.schema";

export type APP_ENV = Zod.infer<typeof AppEnvSchema>;

export type APP_ENV_NAME = keyof APP_ENV;
