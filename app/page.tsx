"use client"; // This marks the file as a Client Component

// app/page.tsx
import React from "react";
import { Card } from "../components/Card";

const Home: React.FC = () => {
  return (
    <div className="mx-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Board Game App</h1>
      <Card gameName="Wavelength" link="/wavelength" />
      {/* Add more Card components for other games here */}
    </div>
  );
};

export default Home;
