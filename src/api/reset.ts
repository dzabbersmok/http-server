import { httpHandler } from "./readiness.js";
import { config } from "../config.js";
import { deleteDB } from "../db/queries/users.js";
import { ForbiddenError } from "./errors.js";

export const handlerReset: httpHandler = async (_req, res) => {
    if (config.api.platform !== "dev") {
        throw new ForbiddenError("Can't park there mate!");
    } else {
        await deleteDB();
    }
    
    config.api.fileserverHits = 0;
    res.write("Hits reset to 0");
    res.end();
}