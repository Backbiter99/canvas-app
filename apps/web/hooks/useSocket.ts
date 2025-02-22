import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        //change this
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkNzUyYWQzNC03MzgwLTRkZmMtYmE2Ni01MzE2MDNhYWNjOTQiLCJpYXQiOjE3Mzk0NDQxNTV9.SYztLFbPtGAmV5NOvsasSQJ6vozFj-tOL5LssjTBdc4";
        const link = `${WS_URL}?token=${token}`;
        const ws = new WebSocket(link);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        };
    }, []);

    return { socket, loading };
}
