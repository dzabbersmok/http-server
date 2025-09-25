import express from "express";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";

import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc, errorMiddleWare } from "./api/middleware.js"
import { handlerMetrics } from "./api/metrics.js";
import { handlerReset } from "./api/reset.js";
import { handlerValidateChirp } from "./api/validate.js";
import { config } from "./config.js";
import { handlerCreateUser } from "./api/create.js";

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);

const app = express();

app.use(express.json());
app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));

app.get("/api/healthz", async (req, res, next) => {
    try {
        await handlerReadiness(req, res);
    } catch (error) {
        next(error);
    }
});

app.post("/api/validate_chirp", async (req, res, next) => {
    try {
        await handlerValidateChirp(req, res);
    } catch (error) {
        next(error);
    }
});

app.get("/admin/metrics", async (req, res, next) => {
    try {
        await handlerMetrics(req, res);
    } catch (error) {
        next(error);
    }
});

app.post("/admin/reset", async (req, res, next) => {
    try {
        await handlerReset(req, res);
    } catch (error) {
        next(error);
    }
});

app.post("/api/users", async (req, res, next) => {
    try {
        await handlerCreateUser(req, res);
    } catch (error) {
        next(error);
    }
});

app.use(errorMiddleWare);

app.listen(config.api.port, () => {
    console.log(`Server is running at http://localhost:${config.api.port}`);
});