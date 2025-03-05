import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function DashboardJoinRoom() {
    const joinRef = useRef<HTMLInputElement>(null);
    const navigate = useRouter();

    async function handleJoin() {
        if (!joinRef.current) {
            return;
        }
        const roomName = joinRef.current.value.toString();
        try {
            const res = await axios.get(
                `${HTTP_BACKEND}/api/v1/room/${roomName}`
            );

            const room = res.data;
            if (!room) {
                alert(`Room having the name ${roomName} does not exist`);
                return;
            }
            const roomId = room.id;

            navigate.push(`/canvas/${roomId}`);
        } catch (error) {
            alert(`Room having the name ${roomName} does not exist`);
            return;
        }
    }

    return (
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 mt-6 shadow-md rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Join a Room
            </h4>
            <div className="mt-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Room Name"
                    ref={joinRef}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    onClick={handleJoin}
                >
                    <LogIn className="w-5 h-5" /> <span>Join</span>
                </button>
            </div>
        </div>
    );
}
