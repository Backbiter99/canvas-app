"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../hooks/useSocket";

interface IMessage {
    id: string;
    message: string;
    roomId: string;
    userId: string;
}

interface IParams {
    messages: IMessage[];
    roomId: string;
}

export function ChatRoomClient({ messages, roomId }: IParams) {
    const [chats, setChats] = useState(messages);
    const { socket, loading } = useSocket();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setChats(messages);
    }, [messages]);

    useEffect(() => {
        if (socket && !loading) {
            socket.send(
                JSON.stringify({
                    type: "join_room",
                    roomId: roomId,
                })
            );

            socket.onmessage = (e) => {
                const parsedData = JSON.parse(e.data);
                if (parsedData.type === "chat") {
                    setChats((c) => [
                        ...c,
                        {
                            id: parsedData.id,
                            message: parsedData.message,
                            roomId: parsedData.roomId,
                            userId: parsedData.userId,
                        },
                    ]);
                }
            };
        }
    }, [socket, loading, roomId]);

    return (
        <div>
            {chats.map((m) => {
                return <div key={String(m.id)}>{m.message}</div>;
            })}

            <input
                type="text"
                placeholder="type your message here"
                ref={inputRef}
            />
            <button
                onClick={() => {
                    const message = inputRef.current?.value;

                    socket?.send(
                        JSON.stringify({
                            type: "chat",
                            roomId: roomId,
                            message: message,
                        })
                    );

                    if (inputRef.current) {
                        inputRef.current.value = "";
                    }
                }}
            >
                Send
            </button>
        </div>
    );
}
