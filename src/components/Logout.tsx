"use client";

import React from "react";
import { signOut } from "next-auth/react";

const Logout = () => {
  return (
    <p
      onClick={() => signOut()}
      className="ms-auto  text-lg font-semibold  hover:translate-x-[1px] cursor-pointer hover:shadow-[-3px_7px_0px_0px_rgba(0,0,0,1)]   border border-black  transition-all  px-2 py-1"
    >
      Logout
    </p>
  );
};

export default Logout;
