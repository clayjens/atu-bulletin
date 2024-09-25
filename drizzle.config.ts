import { type Config } from "drizzle-kit";

import env from "@/env";

export default {
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
} satisfies Config;
