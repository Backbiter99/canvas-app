import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
    const navigate = useRouter();
    return (
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
    );
}
