// app/wavelength/[roomId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Pusher from "pusher-js";
import { pusherClient } from "../../lib/pusher";
import StartScreen from "./components/StartScreen";
import { useAuth } from "../../context/AuthContext";
import { getDatabase, onValue, ref, set } from "firebase/database";
// Import other screens when ready
// import HintScreen from './components/HintScreen';
// import GuessScreen from './components/GuessScreen';
// import ResultScreen from './components/ResultScreen';

interface User {
  name: string;
  score: number;
}

const Room = () => {
  const { user, loading, userName, setUserName } = useAuth();
  const { roomId } = useParams();
  const [users, setUsers] = useState<User[]>([{ name: userName, score: 0 }]);
  const [currentScreen, setCurrentScreen] = useState<
    "start" | "hint" | "guess" | "result"
  >("start");
  const [roundStarter, setRoundStarter] = useState<string | null>(null);
  const db = getDatabase();

  useEffect(() => {
    if (!roomId) return;

    const roomRef = ref(db, `wavelength/rooms/${roomId}`);
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUsers(data.users ? Object.values(data.users) : []);
        setCurrentScreen(data.gameState?.currentScreen);
        setRoundStarter(data.gameState?.roundStarter);
      }
    });

    return () => unsubscribe();
  }, [roomId, db]);

  const startRound = async (starter: string) => {
    setRoundStarter(starter);
    await set(ref(db, `wavelength/rooms/${roomId}/gameState`), {
      currentScreen: "hint",
      roundStarter: starter,
    });
    setCurrentScreen("hint");
  };

  if (!roomId) return <div>Loading...</div>;

  return (
    <>
      {currentScreen === "start" && (
        <StartScreen
          roomId={roomId as string}
          userName={userName}
          users={users}
          onStartRound={startRound}
        />
      )}
      {/* Render other screens based on the currentScreen state */}
      {/* {currentScreen === 'hint' && <HintScreen roomId={roomId} userName={userName} />} */}
      {/* {currentScreen === 'guess' && <GuessScreen roomId={roomId} userName={userName} />} */}
      {/* {currentScreen === 'result' && <ResultScreen roomId={roomId} userName={userName} />} */}
    </>
  );
};

export default Room;
