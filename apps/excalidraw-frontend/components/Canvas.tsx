import { initDraw } from "@/draw";
import React, { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "pencil";

export function Canvas({
    roomId,
    socket,
}: {
    roomId: string;
    socket: WebSocket;
}) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [game, setGame] = useState<Game>();
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [selectedTool, setSelectedTool] = useState<Tool>("circle");

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            };
        }
    }, [canvasRef.current]);
    return (
        <div className="overflow-hidden h-screen">
            <canvas
                ref={canvasRef}
                width={dimensions.width}
                height={dimensions.height}
            ></canvas>
            <Topbar
                selectedTool={selectedTool}
                setSelectedTool={setSelectedTool}
            />
        </div>
    );
}

function Topbar({
    selectedTool,
    setSelectedTool,
}: {
    selectedTool: Tool;
    setSelectedTool: (t: Tool) => void;
}) {
    return (
        <div className="fixed top-10 left-10 text-white">
            <div className="flex gap-2">
                <IconButton
                    activated={selectedTool == "pencil"}
                    icon={<Pencil />}
                    onClick={() => {
                        setSelectedTool("pencil");
                    }}
                />
                <IconButton
                    activated={selectedTool == "rect"}
                    icon={<RectangleHorizontalIcon />}
                    onClick={() => {
                        setSelectedTool("rect");
                    }}
                />
                <IconButton
                    activated={selectedTool == "circle"}
                    icon={<Circle />}
                    onClick={() => {
                        setSelectedTool("circle");
                    }}
                />
            </div>
        </div>
    );
}
