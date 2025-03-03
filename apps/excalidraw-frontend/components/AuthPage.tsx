"use client";

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface IAuthPage {
    isSignin: boolean;
}

export function AuthPage({ isSignin }: IAuthPage) {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useRouter();

    async function handleSubmit() {
        let username = "",
            password = "",
            name = "";
        if (!isSignin) {
            if (nameRef.current && emailRef.current && passwordRef.current) {
                name = nameRef.current.value;
                username = emailRef.current.value;
                password = passwordRef.current.value;
            } else {
                return;
            }
        } else {
            if (emailRef.current && passwordRef.current) {
                username = emailRef.current.value;
                password = passwordRef.current.value;
            } else {
                return;
            }
        }

        if (isSignin) {
            try {
                const res = await axios.post(`${HTTP_BACKEND}/api/v1/signin`, {
                    username: username,
                    password: password,
                });
                const token = res.data.token;
                if (!token) {
                    alert("Signin Unsuccesfull, Invalid Credentials");
                }
                localStorage.setItem("token", token);
            } catch (error) {
                console.error("Error: ", error);
                alert("Signin Unsuccesfull");
                return;
            }

            navigate.push("/dashboard");
        } else {
            try {
                const res = await axios.post(`${HTTP_BACKEND}/api/v1/signup`, {
                    username: username,
                    password: password,
                    name: name,
                });
                const userId = res.data.userId;
                if (!userId) {
                    alert("Signup Unsuccesfull, Email must be Unique");
                }
            } catch (error) {
                console.error("Error: ", error);
                alert("Signup Unsuccesfull");

                return;
            }

            navigate.push("/signin");
        }
    }

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
            <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-full max-w-md">
                <h3 className="text-gray-900 dark:text-white text-3xl font-bold text-center">
                    {isSignin
                        ? "Sign into your account"
                        : "Create a new Account"}
                </h3>

                {isSignin ? (
                    <div
                        onClick={() => navigate.push("/signup")}
                        className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
                    >
                        Don't have an account?{" "}
                        <span className="font-medium">Sign up</span>
                    </div>
                ) : (
                    <div
                        onClick={() => navigate.push("/signin")}
                        className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition duration-200"
                    >
                        Already have an account?{" "}
                        <span className="font-medium">Sign in</span>
                    </div>
                )}

                <div className="mt-6 space-y-4">
                    {isSignin ? (
                        ""
                    ) : (
                        <div className="flex flex-col">
                            <label className="text-gray-700 dark:text-gray-300 font-medium">
                                Name
                            </label>
                            <input
                                className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Enter your email"
                                ref={nameRef}
                            />
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label className="text-gray-700 dark:text-gray-300 font-medium">
                            Email
                        </label>
                        <input
                            className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            placeholder="Enter your email"
                            ref={emailRef}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 dark:text-gray-300 font-medium">
                            Password
                        </label>
                        <input
                            className="mt-1 p-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="password"
                            placeholder="Enter your password"
                            ref={passwordRef}
                        />
                    </div>

                    <button
                        onClick={() => {
                            handleSubmit();
                        }}
                        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        {isSignin ? "Sign in" : "Sign up"}
                    </button>
                </div>
            </div>
        </div>
    );
}
