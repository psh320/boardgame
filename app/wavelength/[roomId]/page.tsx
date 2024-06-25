"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Pusher from "pusher-js";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import axios from "axios";
import { pusherClient } from "../../lib/pusher";

const Room = () => {
  const { roomId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const channel = pusherClient
      .subscribe("private-chat")
      .bind("evt::test", (data: any) => {
        console.log("test", data);
        setMessages([...messages, data]);
      });

    return () => {
      channel.unbind();
    };
  }, [messages]);

  const handleTestClick = async () => {
    let data = await fetch("/api/pusher", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "test" }),
    });
    let json = await data.json();
    console.log(json);
  };

  // useEffect(() => {
  //   if (!roomId) return;

  //   // Initialize Pusher
  //   const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
  //     cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  //   });

  //   const channel = pusher.subscribe(`presence-${roomId}`);
  //   channel.bind("message", (data: { message: string }) => {
  //     console.log("Message received:", data.message); // Add this log to verify message reception
  //     setMessages((prevMessages) => [...prevMessages, data.message]);
  //   });

  //   return () => {
  //     pusher.unsubscribe(`presence-${roomId}`);
  //   };
  // }, [roomId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // const sendMessage = async () => {
  //   if (message) {
  //     await axios.post("/api/pusher", { message: messageToSend, sender });
  //     const res = await fetch("/api/pusher", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ message, roomId }),
  //     });
  //     if (res.ok) {
  //       setMessage(""); // Clear the input field
  //     } else {
  //       console.error("Message not sent:", res.statusText);
  //     }
  //   }
  // };

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
      <Button onClick={handleTestClick} className="mt-4 w-full">
        Send
      </Button>
    </div>
  );
};

export default Room;
