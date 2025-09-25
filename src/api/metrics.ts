import { httpHandler } from "./readiness";
import { config } from "../config.js";

export const handlerMetrics: httpHandler = async (_req, res) => {
    res.set({'Content-Type': 'text/html; charset=utf-8'})
    res.send(`
                <html>
                    <body>
                        <h1>Welcome, Chirpy Admin</h1>
                        <p>Chirpy has been visited ${config.api.fileserverHits} times!</p>
                    </body>
                </html>
            `);
}