import { httpHandler } from "./readiness";
import { config } from "../config.js";

export const handlerReset: httpHandler = async (_req, res) => {
    config.fileserverHits = 0;
    res.write("Hits reset to 0");
    res.end();
}