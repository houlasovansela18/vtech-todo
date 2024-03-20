import { z } from "zod";

export const AppEnvSchema = z.object({
  db_user: z.string().min(4, { message: "DB username is min 4 chars long!" }),
  db_password: z
    .string()
    .min(8, { message: "Password is min 8 chars long!" })
    .nonempty(),
  db_host: z.string().ip(),
  db_name: z.string().nonempty(),
});
