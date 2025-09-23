import { Request, Response, NextFunction } from "express";

import { config } from "../config.js";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

export const middlewareLogResponses: Middleware = (req, res, next) => {
    res.on("finish", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${res.statusCode}`);
        }
    });
    next();
}

export const middlewareMetricsInc: Middleware = (_req, _res, next) => {
  config.fileserverHits++;
  next();
}
