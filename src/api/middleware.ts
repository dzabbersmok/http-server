import { Request, Response, NextFunction } from "express";

import { config } from "../config.js";
import { respondWithError } from "./json.js";
import { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError } from "./errors.js";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

type ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => void;

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

export const errorMiddleWare: ErrorMiddleware = (err, _req, res, _next) => {
    let statusCode = 500;
    let message = "Something went wrong on our end";

    if (err instanceof BadRequestError) {
        statusCode = 400;
        message = err.message;
    } 

    if (err instanceof UnauthorizedError) {
        statusCode = 401;
        message = err.message;
    }

    if (err instanceof ForbiddenError) {
        statusCode = 403;
        message = err.message;
    }

    if (err instanceof NotFoundError) {
        statusCode = 404;
        message = err.message;
    }

    if (statusCode >= 500) {
        console.log(err.message);
    }

    respondWithError(res, statusCode, message);
}
