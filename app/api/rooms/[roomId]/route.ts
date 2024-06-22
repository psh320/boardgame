import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = req.nextUrl.pathname.split("/").pop(); // Extract roomId from path
    const game = searchParams.get("game");

    // Logic to join a room for the specified game
    return NextResponse.json({ roomId, game });
  } catch (error) {
    console.error("Error in GET /api/rooms:", error);
    return NextResponse.json({ error: "Error joining room" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const roomId = req.nextUrl.pathname.split("/").pop(); // Extract roomId from path
    const game = searchParams.get("game");

    // Logic to create a room for the specified game
    // For now, we are just echoing back the roomId and game
    return NextResponse.json({ roomId, game });
  } catch (error) {
    console.error("Error in POST /api/rooms:", error);
    return NextResponse.json({ error: "Error creating room" }, { status: 500 });
  }
}
