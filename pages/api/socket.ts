import { Server as NetServer } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

interface SocketServer extends NetServer {
  io?: ServerIO;
}

// interface SocketWithIO extends NextApiResponse {
//   socket: {
//     server: SocketServer;
//   };
// }

const ioHandler = (req: NextApiRequest, res: any) => {
  if (!res.socket.server.io) {
    console.log("Setting up Socket.IO...");

    const io = new ServerIO(res.socket.server, {
      path: "/api/socket",
    });

    io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`User joined room: ${room}`);
      });

      socket.on("message", (msg) => {
        console.log("Message received:", msg);
        io.to(msg.room).emit("message", msg);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.IO server already set up");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false, // Disable body parsing (required for WebSocket)
  },
};

export default ioHandler;
