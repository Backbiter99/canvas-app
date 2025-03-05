import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export function DashboardCreateRoom() {
    const roomRef = useRef<HTMLInputElement>(null);
    const navigate = useRouter();

    async function handleNewRoom() {
        if (!roomRef.current) {
            return;
        }
        const roomName = roomRef.current.value.toString();

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${HTTP_BACKEND}/api/v1/room`,
                { name: roomName },
                { headers: { Authorization: token } }
            );

            const roomId = res.data.roomId;
            navigate.push(`/canvas/${roomId}`);
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    return (
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 mt-6 shadow-md rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Room
            </h4>
            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Room Name"
                    ref={roomRef}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    onClick={handleNewRoom}
                >
                    <Plus className="w-5 h-5" /> <span>Create</span>
                </button>
            </div>
        </div>
    );
}
