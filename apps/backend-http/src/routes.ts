import express, { Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { authMiddleware } from "./middleware";
import {
    CreateRoomSchema,
    CreateUserSchema,
    SigninSchema,
} from "@repo/common/types";

const appRouter: Router = express.Router();

appRouter.post("/signup", (req, res) => {
    const data = CreateUserSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            msg: "Incorrect Inputs",
        });
        return;
    }
    const userId = "123";
    res.json({
        userId: userId,
    });
});
appRouter.post("/signin", (req, res) => {
    const data = SigninSchema.safeParse(req.body);
    if (!data.success) {
        res.status(411).json({
            msg: "Incorrect Inputs",
        });
        return;
    }
    const userId = 1;
    const token = jwt.sign({ userId }, JWT_SECRET);

    res.json({ token: token });
});
appRouter.post("/room", authMiddleware, (req, res) => {
    const data = CreateRoomSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            msg: "Incorrect Inputs",
        });
        return;
    }
    res.json({
        roomId: 123,
    });
});

export default appRouter;
