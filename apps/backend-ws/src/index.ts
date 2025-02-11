import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

const wss = new WebSocketServer({ port: 8080 });

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

        ws.on("message", function message(data) {
            ws.send("pong");
        });
    } catch (error) {
        ws.close();
        console.error("Error: ", error);
        return;
    }
});
