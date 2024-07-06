import { NextResponse } from "next/server";
import { getPusherInstance } from "../../../../lib/pusher";

const pusherServer = getPusherInstance();

export async function POST(req: Request) {
  try {
    const { roomId, topic, targetLevel, starter } = await req.json();
    console.log(
      `Starting round in room ${roomId} with topic: ${topic} and target level: ${targetLevel}`
    );
    await pusherServer.trigger(`public-${roomId}`, "start-round", {
      topic,
      targetLevel,
      starter,
    });

    return NextResponse.json({ message: "Round started" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to start round", error: error },
      { status: 500 }
    );
  }
}
