import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  const game = searchParams.get("game");

  // Logic to join a room for the specified game
  return NextResponse.json({ roomId, game });
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");
  const game = searchParams.get("game");

  // Logic to create a room for the specified game
  return NextResponse.json({ roomId, game });
}
