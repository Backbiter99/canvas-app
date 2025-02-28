import { RoomCanvas } from "@/components/RoomCanvas";

export default async function ({
    params,
}: {
    params: Promise<{ roomId: string }>;
}) {
    const roomId = (await params).roomId;
    return <RoomCanvas roomId={roomId} />;
}
