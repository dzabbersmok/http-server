import type { MigrationConfig } from "drizzle-orm/migrator";
import process from "process";
process.loadEnvFile("./.env");

type Config = {
  api: APIConfig;
  db: DBConfig;
}

type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
}

type APIConfig = {
  fileserverHits: number;
  port: number;
  platform: string;
};

function envOrThrow(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};

export const config: Config = {
    api: {
      fileserverHits: 0,
      port: Number(envOrThrow("PORT")),
      platform: envOrThrow("PLATFORM")
    },
    db: {
      url: envOrThrow("DB_URL"),
      migrationConfig: migrationConfig
    }
}