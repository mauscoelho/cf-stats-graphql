import Head from "next/head";
import "tailwindcss/tailwind.css";

export default function Home() {
  return (
    <div className="min-h-screen p-x-0.5 flex flex-col justify-center items-center">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-x-0.5 flex-col justify-center items-center bg-blue-500">
        <h1>Hello</h1>
      </main>
    </div>
  );
}
