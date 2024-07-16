'use client'
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const handleSignIn = async (provider) => {
    await signIn(provider, { callbackUrl: "/search" });
  };

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center">
      {!session && (
        <>
          <p className="text-2xl mb-2">Not Signed In</p>
          <button
            className="bg-blue-600 py-2 px-6 rounded-mb mb-2"
            onClick={() => handleSignIn("google")}
          >
            Sign in with google
          </button>
          <button
            className="bg-none border-gray-300 border py-2 px-6 rounded-md mb-2"
            onClick={() => handleSignIn("github")}
          >
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
