"use client"; // This marks the file as a Client Component

import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  gameName: string;
  link: string;
}

export const Card: React.FC<CardProps> = ({ gameName, link }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(link);
  };

  return (
    <div
      onClick={handleClick}
      className="border border-gray-300 p-4 m-4 cursor-pointer rounded-lg shadow-md hover:bg-gray-200"
    >
      <h2 className="text-xl font-semibold">{gameName}</h2>
    </div>
  );
};
