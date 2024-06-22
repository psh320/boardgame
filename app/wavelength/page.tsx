"use client";

import { useRouter } from "next/router";
import { useState } from "react";

const WavelengthHome = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const createRoom = async () => {
    const res = await fetch("/api/rooms?game=wavelength", {
      method: "POST",
    });
    const data = await res.json();
    setRoomId(data.roomId);
    router.push(`/wavelength/${data.roomId}`);
  };

  return (
    <div>
      <h1>Welcome to Wavelength</h1>
      <button onClick={createRoom}>Create Room</button>
      {roomId && <p>Room ID: {roomId}</p>}
    </div>
  );
};

export default WavelengthHome;
