"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import generateRoomId from "../../utils/generateRoomId";

const WavelengthHome = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const createRoom = async () => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
    router.push(`/wavelength/${newRoomId}`);
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
      <Button onClick={createRoom} className="mb-4 w-full">
        Create Room
      </Button>
      {roomId && <p className="mb-4">Room ID: {roomId}</p>}
      <Input
        type="text"
        placeholder="Enter room number"
        value={joinRoomId}
        onChange={handleJoinRoomInputChange}
      />
      <Button onClick={joinRoom} className="mt-4 w-full bg-green-500">
        Join Room
      </Button>
    </div>
  );
};

export default WavelengthHome;
