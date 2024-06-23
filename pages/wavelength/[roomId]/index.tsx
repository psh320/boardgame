"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useRouter } from "next/router";

let socket: any;

const Room = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    fetch("/api/socket"); // Initialize the Socket.IO server

    socket = io({
      path: "/api/socket", // Ensure the path matches the server configuration
      transports: ["websocket"], // Use WebSocket transport
    });

    socket.on("connect", () => {
      console.log("Connected to socket.io server");
      socket.emit("joinRoom", roomId);
      console.log(`Joined room: ${roomId}`);
    });

    socket.on("message", (msg: any) => {
      console.log("Message received:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket.io server");
    });

    return () => {
      if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
      }
    };
  }, [roomId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (socket && roomId && message) {
      const msg = { room: roomId, text: message };
      socket.emit("message", msg);
      console.log("Message sent:", msg);
      setMessage(""); // Clear the input field
    } else {
      console.log("Message not sent:", {
        socket: socket,
        roomId,
        message,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Room ID: {roomId}</h1>
      <div className="mb-4 bg-gray-100 p-4 rounded-md h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <p key={index} className="mb-2">
            <strong>User:</strong> {msg.text}
          </p>
        ))}
      </div>
      <Input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={handleInputChange}
      />
      <Button onClick={sendMessage} className="mt-4 w-full">
        Send
      </Button>
    </div>
  );
};

export default Room;
