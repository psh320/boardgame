import PusherServer from "pusher";
import PusherClient from "pusher-js";

let pusherInstance: PusherServer | null = null;

export const getPusherInstance = () => {
  if (!pusherInstance) {
    pusherInstance = new PusherServer({
      appId: process.env.PUSHER_APP_ID as string,
      key: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
      secret: process.env.PUSHER_SECRET as string,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
      useTLS: true,
    });
  }
  return pusherInstance;
};

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY as string,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  }
);
