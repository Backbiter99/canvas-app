import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import prisma from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface IUser {
    ws: WebSocket;
    rooms: string[];
    userId: string;
}

const users: IUser[] = [];

wss.on("connection", function connection(ws, req) {
    const url = req.url;
    if (!url) {
        ws.close();
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded || !decoded.userId) {
            throw new Error("authentication error");
        }

        const userId = decoded.userId;

        users.push({ userId, rooms: [], ws });

        ws.on("message", async function message(data) {
            const parsedData = JSON.parse(data as unknown as string);
            // {type: "join-room", roomId: 1}

            if (parsedData.type === "join_room") {
                const user = users.find((x) => {
                    return x.ws === ws;
                });
                user?.rooms.push(parsedData.roomId);
            }

            if (parsedData.type === "leave_room") {
                const user = users.find((x) => {
                    return x.ws === ws;
                });
                if (!user) {
                    return;
                }
                user.rooms = user.rooms.filter((x) => {
                    return x !== parsedData.roomId;
                });
            }

            if (parsedData.type === "chat") {
                const roomId = parsedData.roomId;
                const message = parsedData.message;

                await prisma.chat.create({
                    data: {
                        roomId,
                        message,
                        userId,
                    },
                });

                users.forEach((user) => {
                    if (user.rooms.includes(roomId)) {
                        user.ws.send(
                            JSON.stringify({
                                type: "chat",
                                message: message,
                                roomId,
                            })
                        );
                    }
                });
            }
        });
    } catch (error) {
        ws.close();
        console.error("Error: ", error);
        return;
    }
});
