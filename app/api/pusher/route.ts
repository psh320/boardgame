"use client";

import { NextResponse } from "next/server";
import { getPusherInstance } from "../../lib/pusher";

const pusherServer = getPusherInstance();

export async function POST(req: Request) {
  try {
    const { message, roomId } = await req.json();
    console.log(`Triggering event for room ${roomId} with message: ${message}`);
    await pusherServer.trigger(`public-${roomId}`, "message", {
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
