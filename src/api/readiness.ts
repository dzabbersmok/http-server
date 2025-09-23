import { Request, Response } from "express";

type httpHandler = (req: Request, res: Response) => Promise<void>;

export const handlerReadiness: httpHandler = async (_req, res) => {
    res.set({'Content-Type': 'text/plain; charset=utf-8'})
    res.send("OK");
}