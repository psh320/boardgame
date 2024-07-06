"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Pusher from "pusher-js";
import { pusherClient } from "../../lib/pusher";
import StartScreen from "./components/StartScreen";
// Import other screens when ready
// import HintScreen from './components/HintScreen';
// import GuessScreen from './components/GuessScreen';
// import ResultScreen from './components/ResultScreen';

interface User {
  name: string;
  score: number;
}

const Room = () => {
  const { roomId } = useParams();
  const searchParams = useSearchParams();
  const userName = searchParams.get("name") || "Anonymous";
  const [users, setUsers] = useState<User[]>([{ name: userName, score: 0 }]);
  const [currentScreen, setCurrentScreen] = useState<
    "start" | "hint" | "guess" | "result"
  >("start");
  const [roundStarter, setRoundStarter] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;

    Pusher.logToConsole = true;

    const channel = pusherClient.subscribe(`public-${roomId}`);
    channel.bind("start-round", (data: { starter: string }) => {
      setRoundStarter(data.starter);
      setCurrentScreen("hint");
    });

    // Other bindings for other screens (hint, guess, result) go here

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(`public-${roomId}`);
    };
  }, [roomId]);

  const startRound = async (starter: string) => {
    setRoundStarter(starter);
    await fetch("/api/pusher/start-round", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId, starter }),
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
