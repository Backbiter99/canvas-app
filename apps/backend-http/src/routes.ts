import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { authMiddleware } from "./middleware";

const appRouter: Router = express.Router();

appRouter.post("/signup", (req, res) => {
    const userId = "123";
    res.json({
        userId: userId,
    });
});
appRouter.post("/signin", (req, res) => {
    const userId = 1;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({ token: token });
});
appRouter.post("/room", authMiddleware, (req, res) => {
    res.json({
        roomId: 123,
    });
});

export default appRouter;
