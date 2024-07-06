import { NextResponse } from "next/server";
import { getPusherInstance } from "../../../../lib/pusher";

const pusherServer = getPusherInstance();

export async function POST(req: Request) {
  try {
    const { roomId, hint } = await req.json();
    console.log(`Giving hint in room ${roomId}: ${hint}`);
    await pusherServer.trigger(`public-${roomId}`, "hint", {
      hint,
    });

    return NextResponse.json({ message: "Hint given" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to give hint", error: error },
      { status: 500 }
    );
  }
}
