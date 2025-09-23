import { httpHandler } from "./readiness";
import { config } from "../config.js";

export const handlerMetrics: httpHandler = async (_req, res) => {
    res.set({'Content-Type': 'text/plain; charset=utf-8'})
    res.send(`Hits: ${config.fileserverHits}`);
}