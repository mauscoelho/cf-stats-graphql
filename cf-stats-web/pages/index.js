import Head from "next/head";
import "tailwindcss/tailwind.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen p-x-0.5 flex flex-col">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col w-full pt-10 items-center">
        <h1 className="text-6xl py-2">Crossfit Stats</h1>
        <div className="w-1/2 flex border border-gray-200 rounded-full p-4 shadow text-xl">
          <div>🕵</div>
          <input type="text" className="w-full outline-none px-3" />
        </div>
      </main>
    </div>
  );
}
