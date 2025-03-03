"use client";

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { LogIn, LogOut, Plus, Share2Icon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface IRoom {
    id: string;
    slug: string;
}

export default function () {
    const navigate = useRouter();
    const roomRef = useRef<HTMLInputElement>(null);
    const joinRef = useRef<HTMLInputElement>(null);

    const [rooms, setRooms] = useState<IRoom[]>([]);
    const [checkDelete, setCheckDelete] = useState(false);
    const [isDelete, setIsDelete] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate.push("/signin");
        }
        checkOwned();
    }, []);

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

    async function checkOwned() {
        const token = localStorage.getItem("token")?.toString();
        const res = await axios.get(`${HTTP_BACKEND}/api/v1/rooms`, {
            headers: { Authorization: token },
        });
        const roomArray = res.data;
        console.log(roomArray);
        setRooms(roomArray);
    }

    function handleDelete() {
        setCheckDelete(true);
    }

    async function deleteRoom(roomId: string) {
        const token = localStorage.getItem("token");
        console.log("hihi");

        const res = await axios.delete(
            `${HTTP_BACKEND}/api/v1/room/${roomId}`,
            { headers: { Authorization: token } }
        );

        console.log(res.data);
        checkOwned();
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-6 overflow-scroll">
            {/* Header */}
            <div className="w-full max-w-lg flex justify-between items-center bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg">
                <h3
                    className="text-xl font-bold text-gray-900 dark:text-white cursor-pointer"
                    onClick={() => {
                        navigate.push("/");
                    }}
                >
                    Canvas App
                </h3>
                <span
                    className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-red-500 transition duration-200"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate.push("/");
                    }}
                >
                    <LogOut className="w-6 h-6" />
                </span>
            </div>

            {/* Create Room Section */}
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

            {/* Join Room Section */}
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

            {/* Owned Rooms Section */}
            <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 mt-6 shadow-md rounded-lg">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Your Owned Rooms
                </h4>

                {/* Rooms List with Actions */}
                <div className="mt-4 space-y-3">
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <div
                                key={room.id}
                                className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm"
                            >
                                <span className="text-gray-900 dark:text-white font-medium">
                                    {room.slug}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    ID: {room.id}
                                </span>

                                {/* Join Room */}
                                <span
                                    className="cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                    onClick={() => {
                                        navigate.push(`/canvas/${room.id}`);
                                    }}
                                >
                                    <LogIn className="text-green-600" />
                                </span>

                                {/* Share Room */}
                                <span
                                    className="cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                    onClick={() => {
                                        let url =
                                            location.origin +
                                            `/canvas/${room.id}`;
                                        navigator.clipboard
                                            .writeText(url)
                                            .then(() =>
                                                alert(
                                                    "Copied Sharable Url to the clipboard"
                                                )
                                            );
                                    }}
                                >
                                    <Share2Icon className="text-blue-800" />
                                </span>

                                {/* Delete Room */}
                                <span
                                    className="cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                                    onClick={() => {
                                        setIsDelete(room.id);

                                        handleDelete();
                                    }}
                                >
                                    <Trash2 className="text-red-600" />
                                </span>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            No owned rooms found.
                        </p>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {checkDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Delete Room?
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                            Are you sure you want to delete this room?
                        </p>

                        <div className="flex justify-center gap-4 mt-4">
                            {/* Yes - Confirm Delete */}
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                                onClick={() => {
                                    setCheckDelete(false);
                                    deleteRoom(isDelete);
                                }}
                            >
                                Yes, Delete
                            </button>

                            {/* No - Cancel */}
                            <button
                                className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                                onClick={() => {
                                    setCheckDelete(false);
                                }}
                            >
                                No, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
