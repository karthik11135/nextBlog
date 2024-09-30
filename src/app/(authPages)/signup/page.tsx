"use client";

import React from "react";
import { signupAction } from "@/actions/authActions";
import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import Loader from "@/components/Loader";

interface initialStateType {
  message: string;
  ok: null | boolean;
}

const initialState: initialStateType = {
  message: "",
  ok: null,
};

const SignupPage = () => {
  const [state, formAction] = useFormState(signupAction, initialState);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Signup Form</h1>
      <form
        action={formAction}
        className="w-full max-w-sm mx-auto bg-white p-8  border border-black"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
            type="text"
            id="name"
            name="name"
            placeholder="John doe"
          />
        </div>
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
        {!state.ok && (
          <p className="mb-2 text-red-600 font-extralight text-sm">
            {state.message}
          </p>
        )}

        {state.ok && (
          <p className="mb-2 font-extralight text-green-600 text-sm">
            User created -
            <Link href={"/login"} className="mx-2 text-blue-400 underline">
              Login
            </Link>
          </p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  if (pending) {
    return <Loader />;
  }

  return (
    <button
      className="w-full  bg-black text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
      type="submit"
    >
      Register
    </button>
  );
};

export default SignupPage;
