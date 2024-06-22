// app/layout.tsx
import React from "react";
import Link from "next/link";
import "./globals.css"; // Import global styles

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Board Game App</title>
      </head>
      <body>
        <header className="bg-gray-800 text-white p-4">
          <nav>
            <Link href="/" className="mr-4">
              Home
            </Link>
          </nav>
        </header>
        <main className="p-4">{children}</main>
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>&copy; 2024 Board Game App</p>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
