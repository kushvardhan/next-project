"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter();
    async function handleLogOut(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        try {
            await axios.post("/api/users/logout", {}, { withCredentials: true });
            toast.success("Logout Successful");
            router.push('/login');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Logout failed. Please try again.";
            toast.error(errorMessage);
            console.error("Logout failed:", error);
        }
    }

    return (
        <div className="relative w-full h-screen flex flex-col justify-center items-center gap-3">
            <button
                onClick={handleLogOut}
                className="absolute top-8 cursor-pointer right-6 text-zinc-900 text-xs p-2 hover:bg-red-500 rounded-lg bg-red-600"
            >
                Logout
            </button>
            <h1 className="text-3xl">Profile Page</h1>
            <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione voluptates, veniam accusantium adipisci dolores blanditiis.</h4>
        </div>
    );
}
