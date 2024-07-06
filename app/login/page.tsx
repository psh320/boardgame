"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { ref, set } from "firebase/database";
import { database } from "../lib/firebaseConfig";

const Login = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        router.push(`/?name=${encodeURIComponent(name)}&userId=${userId}`);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth, name, router]);

  const handleLogin = async () => {
    if (!name.trim()) return;

    try {
      const result = await signInAnonymously(auth);
      const userId = result.user.uid;
      await set(ref(database, `users/${userId}`), {
        name,
        score: 0,
      });
      router.push(`/games?name=${encodeURIComponent(name)}&userId=${userId}`);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

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
        onClick={handleLogin}
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
      >
        Join
      </button>
    </div>
  );
};

export default Login;
