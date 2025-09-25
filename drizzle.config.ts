import { defineConfig } from "drizzle-kit";
import { config, migrationConfig } from "./src/config";

export default defineConfig({
  schema: "src/db/schema.ts",
  out: migrationConfig.migrationsFolder,
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.url,
  },
});