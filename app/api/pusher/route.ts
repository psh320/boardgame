import { NextResponse } from "next/server";
import { getPusherInstance } from "../../lib/pusher";

const pusherServer = getPusherInstance();

export async function POST(req: Request, res: Response) {
  try {
    const { message, roomId } = await req.json();
    await pusherServer.trigger(`presence-${roomId}`, "message", {
      message,
      user: "User", // Replace with actual user data if available
      date: new Date(),
    });

    return NextResponse.json({ message: "Message sent" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to send message", error: error },
      { status: 500 }
    );
  }
}
