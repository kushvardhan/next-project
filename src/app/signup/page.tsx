"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setButtonDisabled(!(user.username && user.email && user.password.length >= 6));
    }, [user]);

    async function handleSignUp(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/users/signup", user, { withCredentials: true });
            toast.success("Signup Successful! Redirecting to login...");
            console.log("Signup Success:", res.data);
            router.push("/login");
        } catch (error:any) {
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
            console.error("Signup failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form 
                onSubmit={handleSignUp} 
                className="p-7 border border-blue-300 rounded-md shadow-lg shadow-zinc-400 flex flex-col gap-3"
            >
                <h1 className="text-center text-2xl mb-1 select-none">{loading ? "Processing..." : "Sign Up"}</h1>

                <div className="flex flex-col">
                    <label className="text-zinc-400 text-sm select-none pl-1">Username</label>
                    <input
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        className="bg-zinc-800 py-2 px-2 outline-none mb-2 tracking-wide rounded-lg"
                        type="text"
                        placeholder="Enter Username"
                        disabled={loading}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-zinc-400 text-sm select-none pl-1">Email</label>
                    <input
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="bg-zinc-800 py-2 px-2 outline-none mb-2 tracking-wide rounded-lg"
                        type="email"
                        placeholder="Enter Email"
                        disabled={loading}
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-zinc-400 text-sm select-none pl-1">Password</label>
                    <input
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        className="bg-zinc-800 py-2 px-2 outline-none mb-2 tracking-wide rounded-lg"
                        type="password"
                        placeholder="Enter Password"
                        disabled={loading}
                    />
                </div>

                <button 
                    type="submit" 
                    className={`py-2 rounded-lg mt-2 transition ${
                        buttonDisabled || loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-800 hover:bg-green-700 text-white"
                    }`}
                    disabled={buttonDisabled || loading}
                >
                    {loading ? "Processing..." : "Sign Up"}
                </button>

                <Link href="/login" className="text-blue-500 cursor-pointer text-sm mt-3 text-center">
                    <span className="text-xs text-blue-300">Already have an account? </span>Login
                </Link>
            </form>
        </div>
    );
}
