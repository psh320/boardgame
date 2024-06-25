import { getPusherInstance } from "../../../lib/pusher";

const pusherServer = getPusherInstance();

export async function POST(req: Request) {
  console.log("Authenticating Pusher permissions...");
  const data = await req.text();
  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  // Logic to check user permissions (if necessary)

  const authResponse = pusherServer.authorizeChannel(socketId, channelName);

  return new Response(JSON.stringify(authResponse));
}
