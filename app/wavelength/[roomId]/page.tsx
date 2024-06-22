"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import Input from "../../../components/Input";
import Button from "../../../components/Button";

let socket: any;

const Room = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    if (roomId) {
      socket = io({
        path: "/socket.io", // Ensure the path matches the server configuration
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
        socket.disconnect();
      };
    }
  }, [roomId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    if (socket && roomId && message) {
      const msg = { room: roomId, text: message };
      socket.emit("message", msg);
      console.log("Message sent:", msg);
      setMessages((prevMessages) => [...prevMessages, msg]); // Add to chat history
      setMessage(""); // Clear the input field
    } else {
      console.log("Message not sent:", { socket, roomId, message });
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
