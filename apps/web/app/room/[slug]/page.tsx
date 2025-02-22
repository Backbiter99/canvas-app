import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../components/ChatRoom";

async function getRoomId(slug: string) {
    try {
        console.log("Input slug: ", slug);

        const response = await axios.get(`${BACKEND_URL}/api/v1/room/${slug}`);
        console.log(response.data);

        return response.data.id;
    } catch (error) {
        console.error("Error: ", error);
    }
}

export default async function Room({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;
    const roomId = await getRoomId(slug);
    if (!roomId) {
        return <div>Room not found</div>;
    }

    return <ChatRoom roomId={roomId}></ChatRoom>;
}
