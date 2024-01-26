import type { Config } from "drizzle-kit";
import { DATABASE_URL } from "./config";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "libsql", // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: DATABASE_URL,
  },
} satisfies Config;
