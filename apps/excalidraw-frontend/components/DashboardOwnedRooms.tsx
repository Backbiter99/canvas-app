import { IRoom } from "@/app/dashboard/page";
import { LogIn, Share2Icon, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface IProps {
    rooms: IRoom[];
    passIsDelete: (id: string) => void;
    passSetDelete: (value: boolean) => void;
}

export default function DashboardOwnedRooms({
    rooms,
    passIsDelete,
    passSetDelete,
}: IProps) {
    const navigate = useRouter();

    return (
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
                                        location.origin + `/canvas/${room.id}`;
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
                                    passIsDelete(room.id);

                                    passSetDelete(true);
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
    );
}
