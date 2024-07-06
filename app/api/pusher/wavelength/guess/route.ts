import { NextResponse } from "next/server";
import { getPusherInstance } from "../../../../lib/pusher";

const pusherServer = getPusherInstance();

export async function POST(req: Request) {
  try {
    const { roomId, user, guess } = await req.json();
    console.log(`User ${user} guessed ${guess} in room ${roomId}`);
    await pusherServer.trigger(`public-${roomId}`, "guess", {
      user,
      guess,
    });
    return NextResponse.json({ message: "Guess submitted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to submit guess", error: error },
      { status: 500 }
    );
  }
}
