import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { authMiddleware } from "./middleware";
import {
    CreateRoomSchema,
    CreateUserSchema,
    SigninSchema,
} from "@repo/common/types";
import prisma from "@repo/db/client";

const appRouter: Router = express.Router();

appRouter.post("/signup", async (req: Request, res: Response) => {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            msg: "Incorrect Inputs",
        });
        return;
    }

    try {
        const user = await prisma.user.create({
            data: {
                name: parsedData.data.name,
                // Todo : hasj the password
                password: parsedData.data.password,
                email: parsedData.data.username,
            },
        });

        const userId = user.id;
        res.json({
            userId: userId,
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(411).json({ msg: "User with this email already exists" });
    }
});

appRouter.post("/signin", async (req: Request, res: Response) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(411).json({
            msg: "Incorrect Inputs",
        });
        return;
    }

    try {
        // Todo: Compare the hashed passwords here
        const user = await prisma.user.findFirst({
            where: {
                email: parsedData.data.username,
                password: parsedData.data.password,
            },
        });
        if (!user) {
            res.status(403).json({
                msg: "user not found/ incorrect credentials",
            });
            return;
        }

        const userId = user.id;
        const token = jwt.sign({ userId }, JWT_SECRET);

        res.json({ token: token });
    } catch (error) {
        console.error("Error: ", error);
        res.status(411).json({ msg: "Error while signing in" });
        return;
    }
});

appRouter.post("/room", authMiddleware, async (req: Request, res: Response) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            msg: "Incorrect Inputs",
        });
        return;
    }

    try {
        const userId = req.userId!;

        const room = await prisma.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId,
            },
        });
        res.json({
            roomId: room.id,
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(411).json({ msg: "Room with this name already exists" });
        return;
    }
});

appRouter.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);

    const messages = await prisma.chat.findMany({
        where: {
            roomId: roomId,
        },
        take: 50,
        orderBy: {
            id: "desc",
        },
    });

    res.json(messages);
});

appRouter.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    console.log("Slug: ", slug);

    try {
        const room = await prisma.room.findFirst({
            where: {
                slug,
            },
            select: {
                id: true,
            },
        });

        res.json(room);
    } catch (error) {
        res.status(411).json("Invalid Slug");
        console.error("Error: ", error);
    }
});

appRouter.get("/rooms", authMiddleware, async (req, res) => {
    const userId = req.userId;
    try {
        const rooms = await prisma.room.findMany({
            where: { adminId: userId },
        });
        res.json(rooms);
    } catch (error) {
        console.error("Error: ", error);
    }
});

appRouter.delete("/room/:roomId", authMiddleware, async (req, res) => {
    const roomId = Number(req.params.roomId);
    const userId = req.userId;
    console.log(roomId, userId);

    try {
        await prisma.room.delete({
            where: {
                id: roomId,
                adminId: userId,
            },
        });

        res.json("deleted successfully");
    } catch (error) {
        console.error("Error :", error);
    }
});

export default appRouter;
