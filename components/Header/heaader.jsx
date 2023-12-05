import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "@/pages/auth/firebase";




const heaader = () => {
    const router = useRouter();

    // ------------Handling Sign Out --------------------
    const handleSignOut = async () => {
      try {
        await auth.signOut();
        console.log("User signed out successfully");
        router.push("/");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };



  return (
    <div className="w-full h-20 p-4 flex overflow-scroll justify-center bg-slate-800 text-white gap-4 font-semibold">
      <div>
        <Link
          className="p-1 px-2 hover:bg-blue-600  h-fit  rounded-md"
          href="/"
        >
          Home
        </Link>
        <Link
          className="p-1 px-2 hover:bg-blue-600  h-fit  rounded-md"
          href="/"
        >
          Trending
        </Link>
        <Link
          className="p-1 px-2 hover:bg-blue-600  h-fit  rounded-md"
          href="/"
        >
          Sports
        </Link>
        <Link
          className="p-1 px-2 hover:bg-blue-600  h-fit  rounded-md"
          href="/"
        >
          Entertainment
        </Link>
        <Link
          className="p-1 px-2 hover:bg-blue-600  h-fit  rounded-md"
          href="/"
        >
          Business
        </Link>
      </div>
      <div>
        {auth.currentUser ? (
          <button onClick={handleSignOut}>Sign Out</button>
        ) : (
          <Link href="/auth/signin">Sign in</Link>
        )}
      </div>
    </div>
  );
};

export default heaader;
