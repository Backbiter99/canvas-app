"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({ roomId }: { roomId: string }) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZWVkZThlYS01NTQ3LTQyMmMtYjRhMy1lYjRiZTY0MTA4MWQiLCJpYXQiOjE3NDA3MzM2MTB9.mJu_GOMAScmEQ8AWNl_eFjcX9XQQf55XKnbaT9LT1HM";
        const ws = new WebSocket(`${WS_URL}?token=${token}`);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({ type: "join_room", roomId: roomId }));
        };
    }, []);

    if (!socket) {
        return <div>Connecting to Server...</div>;
    }

    return (
        <div>
            <Canvas roomId={roomId} socket={socket} />
        </div>
    );
}
