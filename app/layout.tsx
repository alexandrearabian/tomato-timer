import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Tomato Timer",
  description: "Pomodoro Timer",
};

const MAX_HOURS = 12;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cousine:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-stone-800 text-stone-200">
        <div className="flex flex-col text-center items-center h-screen space-y-8 mt-16">
          <p className="text-8xl">🥫</p>
          <h1 className="text-6xl font-bold">Tomato Timer</h1>
          <p className="text-lg text-center sm:text-left">
            A simple Pomodoro Timer to help you focus.
          </p>
          <p className="text-sm">(max. {MAX_HOURS} hours)</p>
          {children}
        </div>
        <div className="text-center text-xs text-stone-400 mb-4">
          Sound Effect by{" "}
          <a href="https://pixabay.com/users/freesound_community-46691455/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6402">
            freesound_community
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6402">
            Pixabay
          </a>
        </div>
        <div className="absolute flex items-end ml-5 mb-5 inset-0 -z-10 left-1 transform -translate-x-1/8 -translate-y-1/2 ">
          <div className="w-96 h-96 bg-red-500 rounded-full filter blur-3xl opacity-50" />
        </div>
      </body>
    </html>
  );
}
