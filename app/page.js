"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  const handleSignIn = async (provider) => {
    await signIn(provider, { callbackUrl: "/search" });
  };

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      {!session && (
        <>
          <p className="text-2xl mb-2">Sign In With:</p>
          <button
            className="bg-white border-gray-300 border py-2 px-6 rounded-md mb-2 flex justify-between items-center"
            onClick={() => handleSignIn("google")}
          >
            <Image
              src="/google.svg"
              alt="Google icon"
              width={24}
              height={24}
              className="mr-2"
            />
            Sign in with google
          </button>
          <button
            className="bg-white border-gray-300 border py-2 px-6 rounded-md mb-2 flex justify-between items-center"
            onClick={() => handleSignIn("github")}
          >
            <Image
              src="/github.svg"
              alt="Google icon"
              width={24}
              height={24}
              className="mr-2"
            />
            Sign in with github
          </button>
        </>
      )}
      {session && session.user && (
        <p className="text-2xl mb-2">{`You are logged in as ${session.user.name}`}</p>
      )}
    </main>
  );
}
