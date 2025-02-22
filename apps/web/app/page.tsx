"use client";
import { useRef, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
            }}
        >
            <input
                style={{ padding: 10 }}
                type="text"
                placeholder="Room Id"
                ref={inputRef}
            />
            <button
                style={{ padding: 10 }}
                onClick={() => {
                    const roomId = inputRef.current?.value;
                    router.push(`/room/${roomId}`);
                }}
            >
                Join Room
            </button>
        </div>
    );
}
