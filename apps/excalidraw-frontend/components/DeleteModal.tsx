interface IProps {
    passSetCheckDelete: (value: boolean) => void;
    deleteRoom: (roomId: string) => void;
    isDelete: string;
}

export default function DeleteModal({
    passSetCheckDelete,
    deleteRoom,
    isDelete,
}: IProps) {
    return (
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
                            passSetCheckDelete(false);
                            deleteRoom(isDelete);
                        }}
                    >
                        Yes, Delete
                    </button>

                    {/* No - Cancel */}
                    <button
                        className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                        onClick={() => passSetCheckDelete(false)}
                    >
                        No, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
