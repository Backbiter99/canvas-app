import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization || "";

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(403).json({ msg: "unauthorized" });
        return;
    }
};
