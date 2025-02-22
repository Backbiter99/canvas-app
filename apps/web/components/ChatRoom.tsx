import axios from "axios";
import { BACKEND_URL } from "../app/config";
import { ChatRoomClient } from "./ChatRoomClient";

interface IChatRoom {
    roomId: string;
}

async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/api/v1/chats/${roomId}`);
    console.log("messages: ", response.data);

    return response.data;
}

export async function ChatRoom({ roomId }: IChatRoom) {
    const messages = await getChats(roomId);

    return (
        <ChatRoomClient messages={messages} roomId={roomId}></ChatRoomClient>
    );
}
