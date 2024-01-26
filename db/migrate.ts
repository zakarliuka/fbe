import { migrate } from "drizzle-orm/libsql/migrator";

import { db } from "./db";

(async function () {
  console.log("START MIGRATION");
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("END MIGRATION");
})();
