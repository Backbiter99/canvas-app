import { HTTP_BACKEND } from "@/config";
import axios from "axios";

export async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/api/v1/chats/${roomId}`);
    console.log(res.data);

    const messages = res.data ?? [];

    console.log(messages);

    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        return messageData;
    });

    console.log("shapes: ", shapes);

    return shapes;
}
