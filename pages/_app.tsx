import { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4">
        <h1>My Board Game App</h1>
      </header>
      <main className="flex-grow p-4">
        <Component {...pageProps} />
      </main>
      <footer className="bg-blue-500 text-white p-4 text-center">
        &copy; 2024 My Board Game App
      </footer>
    </div>
  );
}

export default MyApp;
