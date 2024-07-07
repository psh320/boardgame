// app/layout.tsx

import React from "react";
import Link from "next/link";
import Head from "next/head";
import "./globals.css"; // Import global styles
import { AuthProvider } from "./context/AuthContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <Head>
        <title>Boardgame App Online</title>
        <meta
          name="description"
          content="Play board games online with your friends. Join us for an exciting experience of fun and strategy."
        />
        <meta
          name="keywords"
          content="board game online, online game with friends, play board games"
        />
        <meta property="og:title" content="Boardgame App Online" />
        <meta
          property="og:description"
          content="Play board games online with your friends. Join us for an exciting experience of fun and strategy."
        />
        <meta property="og:url" content="https://boardgame-silk.vercel.app/" />
        <meta property="og:type" content="website" />
      </Head>
      <body className="flex flex-col min-h-screen">
        <header className="bg-gray-800 text-white p-4">
          <nav>
            <Link href="/" className="mr-4">
              Home
            </Link>
          </nav>
        </header>
        <AuthProvider>
          <main className="flex-grow container mx-auto p-4">{children}</main>
        </AuthProvider>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2024 Board Game App</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
