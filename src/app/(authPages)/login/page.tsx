"use client";

import { signIn } from "next-auth/react";
import React, { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOps } from "@/lib/auth";
import Loader from "@/components/Loader";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const [isPending, transition] = useTransition();
  const errorCreds = searchParams.get("error");

  const loginHandler = (formData: FormData) => {
    transition(async () => {
      const res = await signIn("credentials", {
        email: formData.get("email"),
        name: formData.get("name"),
        password: formData.get("password"),
        redirect: true,
      });

      if (!res?.ok) {
        console.log("its not okay");
        return;
      }
    });

    console.log("has ended");
  };

  if (session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Login Form</h1>
      <form
        action={loginHandler}
        className="w-full max-w-sm mx-auto bg-white p-8 border border-black"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            type="text"
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            type="text"
            id="password"
            name="password"
            placeholder="password"
          />
        </div>

        {errorCreds && (
          <p className="mb-2 text-red-600 font-extralight text-sm">
            Invalid credentials
          </p>
        )}

        {!isPending && (
          <button
            className="w-full disabled:cursor-not-allowed disabled:bg-slate-400 bg-black text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
            type="submit"
          >
            Register
          </button>
        )}

        {isPending && <Loader />}
      </form>
    </div>
  );
};

export default LoginPage;
