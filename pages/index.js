import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-120 from-blue-500 to-purple-600">
      <div>
        <h1 className="text-8xl text-blue-100">
          This is my first next.js project
        </h1>
      </div>
    </div>
  );
}
