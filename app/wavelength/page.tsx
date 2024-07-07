// app/wavelength/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import generateRoomId from "../../utils/generateRoomId";
import { useAuth } from "../context/AuthContext";
import { get, getDatabase, ref, set } from "firebase/database";

const WavelengthHome = () => {
  const { user, loading, userName, setUserName } = useAuth();
  const db = getDatabase();
  const router = useRouter();
  const [joinRoomId, setJoinRoomId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const createRoom = async () => {
  //   const newRoomId = generateRoomId();
  //   router.push(`/wavelength/${newRoomId}`);
  // };

  const createRoom = async () => {
    const newRoomId = generateRoomId();
    if (user) {
      await set(ref(db, `wavelength/rooms/${newRoomId}`), {
        users: {
          [user.uid]: { name: userName, score: 0 },
        },
        gameState: {
          currentScreen: "start",
          roundStarter: null,
        },
      });
      router.push(`/wavelength/${newRoomId}`);
    }
  };

  // const joinRoom = () => {
  //   if (joinRoomId) {
  //     router.push(`/wavelength/${joinRoomId}`);
  //   }
  // };

  const joinRoom = async () => {
    if (joinRoomId && user) {
      const roomRef = ref(db, `rooms/${joinRoomId}`);
      const roomSnapshot = await get(roomRef);

      if (roomSnapshot.exists()) {
        await set(ref(db, `wavelength/rooms/${joinRoomId}/users/${user.uid}`), {
          name: userName,
          score: 0,
        });
        router.push(`/wavelength/${joinRoomId}`);
      } else {
        setErrorMessage(
          "Room does not exist. Please check the room ID and try again."
        );
      }
    }
  };

  const handleJoinRoomInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrorMessage("");
    setJoinRoomId(e.target.value.toUpperCase());
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Wavelength</h1>
      <Button onClick={createRoom} className="mb-4 w-full">
        Create Room
      </Button>
      <Input
        type="text"
        placeholder="Enter room number"
        value={joinRoomId}
        onChange={handleJoinRoomInputChange}
      />
      <Button onClick={joinRoom} className="mt-4 w-full bg-green-500">
        Join Room
      </Button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </div>
  );
};

export default WavelengthHome;
