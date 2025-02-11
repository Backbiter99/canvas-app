import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization || "";

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.toString();

        next();
    } catch (error) {
        res.status(403).json({ msg: "unauthorized" });
    }
};
