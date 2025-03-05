"use client";

import { DashboardCreateRoom } from "@/components/DashboardCreateRoom";
import { DashboardHeader } from "@/components/DashboardHeader";
import DashboardJoinRoom from "@/components/DashboardJoinRoom";
import DashboardOwnedRooms from "@/components/DashboardOwnedRooms";
import DeleteModal from "@/components/DeleteModal";
import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface IRoom {
    id: string;
    slug: string;
}

export default function () {
    const navigate = useRouter();

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

    async function checkOwned() {
        const token = localStorage.getItem("token")?.toString();
        const res = await axios.get(`${HTTP_BACKEND}/api/v1/rooms`, {
            headers: { Authorization: token },
        });
        const roomArray = res.data;
        console.log(roomArray);
        setRooms(roomArray);
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
            <DashboardHeader />

            {/* Create Room Section */}
            <DashboardCreateRoom />

            {/* Join Room Section */}
            <DashboardJoinRoom />

            {/* Owned Rooms Section */}
            <DashboardOwnedRooms
                rooms={rooms}
                passIsDelete={setIsDelete}
                passSetDelete={setCheckDelete}
            />

            {/* Delete Confirmation Modal */}
            {checkDelete && (
                <DeleteModal
                    passSetCheckDelete={setCheckDelete}
                    deleteRoom={deleteRoom}
                    isDelete={isDelete}
                />
            )}
        </div>
    );
}
