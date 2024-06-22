"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket: any;

const Room = () => {
  const router = useRouter();
  const { roomId } = router.query;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    socket = io();

    if (roomId) {
      socket.emit("joinRoom", roomId);
    }

    socket.on("message", (msg: any) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    socket.emit("message", { room: roomId, text: message });
    setMessage("");
  };

  return (
    <div>
      <h1>Room ID: {roomId}</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Room;
