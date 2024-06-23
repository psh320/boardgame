import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true,
});

export async function POST(request: Request) {
  const { message, roomId } = await request.json();
  await pusher.trigger(`presence-${roomId}`, "message", {
    message,
  });
  return NextResponse.json({ message: "Message sent" });
}
