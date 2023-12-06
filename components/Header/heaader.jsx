import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "@/utils/firebase";
import Image from "next/image";
import logo from "@/public/logo.png";

const Header = () => {
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
    <>
      {" "}
      <div className="w-full h-20 p-4 flex overflow-scroll justify-start bg-slate-800 text-white gap-4 font-semibold">
        <div className=" justify-start items-start w-[10%] gap-4 rounded-full">
          <Link href="/">
            <Image
              src={logo}
              width={40}
              className="bg-white rounded-full p-1"
            />
          </Link>
        </div>

        <div className="w-full  md:flex hidden gap-0 md:gap-4 flex-wrap">
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
        <div className="flex gap-8 w-full md:w-1/3 justify-end">
          <Link href="/favorite">Favorites</Link>
          <div>
            {auth.currentUser ? (
              <button onClick={handleSignOut}>Sign Out</button>
            ) : (
              <Link href="/auth/signin">Sign in</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
