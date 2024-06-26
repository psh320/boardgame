"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { pusherClient } from "../../lib/pusher";

const Room = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!roomId) return;

    const channel = pusherClient.subscribe(`public-${roomId}`);
    channel.bind("message", (data: { message: string }) => {
      console.log("Message received:", data.message);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      channel.unbind("message");
      pusherClient.unsubscribe(`public-${roomId}`);
    };
  }, [roomId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    if (message) {
      const res = await fetch("/api/pusher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, roomId }),
      });
      if (res.ok) {
        setMessage(""); // Clear the input field
      } else {
        console.error("Message not sent:", res.statusText);
      }
    }
  };

  if (!roomId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Room ID: {roomId}</h1>
      <div className="mb-4 bg-gray-100 p-4 rounded-md h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <p key={index} className="mb-2">
            <strong>User:</strong> {msg}
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
