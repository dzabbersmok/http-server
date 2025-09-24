import express from "express";

import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses, middlewareMetricsInc, errorMiddleWare } from "./api/middleware.js"
import { handlerMetrics } from "./api/metrics.js";
import { handlerReset } from "./api/reset.js";
import { handlerValidateChirp } from "./api/validate.js";

const app = express();
const PORT = 8080;

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

app.use(errorMiddleWare);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});