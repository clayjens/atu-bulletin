import { createEnv } from "@t3-oss/env-core";
import { ZodError, z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    CLERK_SECRET_KEY: z.string().startsWith("sk_"),
    POSTGRES_URL: z.string().url().startsWith("postgres://"),
    POSTGRES_PRISMA_URL: z.string().url().startsWith("postgres://"),
    POSTGRES_URL_NO_SSL: z.string().url().startsWith("postgres://"),
    POSTGRES_URL_NON_POOLING: z.string().url().startsWith("postgres://"),
    POSTGRES_USER: z.string(),
    POSTGRES_HOST: z.string(),
    POSTGRES_PASSWORD: z.string(),
    POSTGRES_DATABASE: z.string(),
    WEBHOOK_SECRET: z.string(),
  },
  emptyStringAsUndefined: true,
  // eslint-disable-next-line n/no-process-env
  runtimeEnv: process.env,
  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid server environment variables:",
      error.flatten().fieldErrors
    );
    process.exit(1);
  },
});
