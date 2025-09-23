import express from "express";

import { handlerReadiness } from "./api/readiness.js";
import { middlewareLogResponses } from "./api/middleware.js"

const app = express();
const PORT = 8080;

app.use("/app", middlewareLogResponses, express.static("./src/app"));

app.get("/healthz", middlewareLogResponses, handlerReadiness);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});