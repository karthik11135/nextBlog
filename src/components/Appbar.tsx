import Link from "next/link";
import React from "react";
import Logout from "./Logout";
import { getServerSession } from "next-auth";
import { authOps } from "../lib/auth";

const Appbar = async () => {
  const session = await getServerSession(authOps);

  console.log(session, "This is appbar session");

  return (
    <div className="flex gap-3 py-4  my-3 border border-black px-2.5">
      <Link
        href={"/"}
        className="font-bold  hover:bg-black hover:text-white transition-all  px-2 py-1 border border-black"
      >
        HOME
      </Link>
      {session && (
        <Link
          href="/newblog"
          className="ms-auto  text-lg font-semibold  hover:translate-x-[1px] cursor-pointer hover:shadow-[-3px_7px_0px_0px_rgba(0,0,0,1)]   border border-black  transition-all  px-2 py-1 "
        >
          New blog
        </Link>
      )}
      {session && <Logout />}
      {!session && (
        <Link
          className="ms-auto  text-lg font-semibold  hover:translate-x-[1px] cursor-pointer hover:shadow-[-3px_7px_0px_0px_rgba(0,0,0,1)]   border border-black  transition-all  px-2 py-1"
          href={"/login"}
        >
          Login
        </Link>
      )}
      {!session && (
        <Link
          className="text-lg font-semibold  hover:translate-x-[1px] cursor-pointer hover:shadow-[-3px_7px_0px_0px_rgba(0,0,0,1)]   border border-black  transition-all  px-2 py-1"
          href={"/signup"}
        >
          Signup
        </Link>
      )}
    </div>
  );
};

export default Appbar;
