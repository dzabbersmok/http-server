import process from "process";
process.loadEnvFile("../.env");

type APIConfig = {
  fileserverHits: number;
  dbURL: string;
};

function envOrThrow(value: string | undefined, key: string): string {
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}

export const config: APIConfig = {
    fileserverHits: 0,
    dbURL: envOrThrow(process.env.DB_URL, "DR_URL")
}