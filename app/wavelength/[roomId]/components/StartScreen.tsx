"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "../../../../components/Button";

interface User {
  name: string;
  score: number;
}

interface StartScreenProps {
  roomId: string;
  userName: string;
  users: User[];
  onStartRound: (starter: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({
  roomId,
  userName,
  users,
  onStartRound,
}) => {
  const router = useRouter();
  const [userList, setUserList] = useState<User[]>(users);

  useEffect(() => {
    // Update user list from props
    setUserList(users);
  }, [users]);

  const handleStartRound = () => {
    onStartRound(userName);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Room ID: {roomId}</h1>
      <div className="mb-4">
        {userList.map((user, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md mb-2">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p>Score: {user.score}</p>
          </div>
        ))}
      </div>
      <Button onClick={handleStartRound} className="mt-4 w-full">
        Start Game
      </Button>
    </div>
  );
};

export default StartScreen;
