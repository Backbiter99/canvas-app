import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type Shape =
    | {
          type: "rect";
          x: number;
          y: number;
          width: number;
          height: number;
      }
    | {
          type: "circle";
          centerX: number;
          centerY: number;
          radius: number;
      };

export async function initDraw(
    canvas: HTMLCanvasElement,
    roomId: string,
    socket: WebSocket
) {
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return;
    }

    let existingShapes: Shape[] = await getExistingShapes(roomId);

    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    clearCanvas(existingShapes, canvas, ctx);

    socket.onmessage = (e) => {
        const message = JSON.parse(e.data);
        if (message.type === "chat") {
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape);
            clearCanvas(existingShapes, canvas, ctx);
        }
    };

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;

        const width = e.clientX - startX;
        const height = e.clientY - startY;

        // @ts-ignore
        const selectedTool = window.selectedTool;
        let shape: Shape | null = null;
        if (selectedTool == "rect") {
            shape = {
                type: "rect",
                x: startX,
                y: startY,
                width,
                height,
            };
        } else if (selectedTool == "circle") {
            const radius = Math.max(width, height) / 2;
            shape = {
                type: "circle",
                radius: radius,
                centerX: width >= 0 ? startX + radius : startX - radius,
                centerY: height >= 0 ? startY + radius : startY - radius,
            };
        }

        if (!shape) {
            return;
        }
        existingShapes.push(shape);

        socket.send(
            JSON.stringify({
                type: "chat",
                message: JSON.stringify(shape),
                roomId,
            })
        );
    });

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            clearCanvas(existingShapes, canvas, ctx);

            ctx.strokeStyle = "rgba(255,255,255)";
            // @ts-ignore
            const selectedTool = window.selectedTool;
            if (selectedTool === "rect") {
                ctx.strokeRect(startX, startY, width, height);
            } else if (selectedTool === "circle") {
                const centerX = startX + width / 2;
                const centerY = startY + height / 2;
                const radius = Math.max(Math.abs(width), Math.abs(height));
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
                ctx.stroke();
                ctx.closePath();
            }
        }
    });
}

function clearCanvas(
    existingShapes: Shape[],
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(0,0,0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingShapes.map((shape) => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "rgba(255,255,255)";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            const centerX = shape.centerX;
            const centerY = shape.centerY;
            const radius = shape.radius;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, false);
            ctx.stroke();
            ctx.closePath();
        }
    });
}

async function getExistingShapes(roomId: string) {
    const res = await axios.get(`${HTTP_BACKEND}/api/v1/chats/${roomId}`);
    console.log(res.data);

    const messages = res.data ?? [];

    console.log(messages);

    const shapes = messages.map((x: { message: string }) => {
        const messageData = JSON.parse(x.message);
        return messageData;
    });

    console.log("shapes: ", shapes);

    return shapes;
}
