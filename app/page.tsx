"use client"; // This marks the file as a Client Component
// app/page.tsx
import React from "react";
import { Card } from "../components/Card";
import { useAuth } from "./context/AuthContext";

const Home: React.FC = () => {
  const { user, loading, userName, setUserName } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Board Game App</h1>
      <div className="flex items-center gap-2">
        <span>Name:</span>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName ?? ""}
          onChange={(e) => setUserName(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <Card gameName="Wavelength" link="/wavelength" />
      {/* Add more Card components for other games here */}
    </div>
  );
};

export default Home;
