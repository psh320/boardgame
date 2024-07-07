// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [name, setName] = useState("");
  const router = useRouter();
  const auth = getAuth();
  const { user, loading, userName, login } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enter Your Name</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full"
      />
      <button
        onClick={() => login(name)}
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
      >
        Set Name
      </button>
    </div>
  );
};

export default Login;
