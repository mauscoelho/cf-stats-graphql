import Head from "next/head";
import React from "react";

export default function Layout({ title, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col flex-1 mx-auto max-w-xl pt-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}
