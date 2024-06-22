"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../../components/Input";
import generateRoomId from "../../utils/generateRoomId";

const WavelengthHome = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const createRoom = async () => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);

    try {
      const res = await fetch(`/api/rooms/${newRoomId}?game=wavelength`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Failed to create room");
      }
      const data = await res.json();
      router.push(`/wavelength/${data.roomId}`);
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room");
    }
  };

  const joinRoom = () => {
    if (joinRoomId) {
      router.push(`/wavelength/${joinRoomId}`);
    }
  };

  const handleJoinRoomInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setJoinRoomId(e.target.value.toUpperCase());
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Wavelength</h1>
      <button
        onClick={createRoom}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md w-full"
      >
        Create Room
      </button>
      {roomId && <p className="mb-4">Room ID: {roomId}</p>}
      <Input
        type="text"
        placeholder="Enter room number"
        value={joinRoomId}
        onChange={handleJoinRoomInputChange}
      />
      <button
        onClick={joinRoom}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md w-full"
      >
        Join Room
      </button>
    </div>
  );
};

export default WavelengthHome;
