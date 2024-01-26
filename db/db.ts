import * as schema from "./schema";

import { DATABASE_AUTH_TOKEN, DATABASE_URL } from "@/config";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_AUTH_TOKEN,
});
export const db = drizzle(client, { schema });
