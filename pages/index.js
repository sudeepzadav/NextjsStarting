import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import styles from "../styles/User.module.css"
import { useRouter } from "next/router";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-120 from-blue-500 to-purple-600">
      <div className="items-center justify-center ">
        <h1 className="text-8xl text-blue-100">
          This is my first next.js project
        </h1>
        <button className={styles.btn} onClick={() => {router.reload()}}>Reload Page</button>
      </div>
    </div>
  );
}
