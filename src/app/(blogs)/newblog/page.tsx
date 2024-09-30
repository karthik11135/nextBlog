"use client";
import { useFormStatus } from "react-dom";
import React from "react";
import { useFormState } from "react-dom";
import { postBlogAction } from "@/actions/blogActions";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Loader from "@/components/Loader";

const initialState: any = {
  message: "",
  ok: false,
};

const page = () => {
  const { data: session } = useSession();

  console.log(session)
  if (!session) {
    redirect("/");
  }

  const [state, formAction] = useFormState(postBlogAction, initialState);

  if(state.ok) {
    redirect('/blogs')
  }

  return (
    <div className="mx-auto w-full grid my-10 grid-cols-12 gap-4">
      <form action={formAction} className="col-span-8 text-black py-2">
        <input
          type="text"
          className="font-light mb-10 text-5xl py-2 focus:outline-none border-b"
          placeholder="Title"
          name={"title"}
        />
        <br />
        <textarea
          className="focus:outline-none border-b mb-4 w-full text-lg font-extralight"
          placeholder="Write your content here"
          rows={6}
          name="content"
        ></textarea>
        <input name="userId" readOnly value={session.user.id} className="hidden" />

        <PostButton />
      </form>
      <div className="col-span-4 py-2 border-2 w-4/6 mx-auto text-center  border-black px-2 bg-yellow-200 h-fit">
        <h2 className="text-2xl font-light text-slate-700">
          Author | {session.user.name}
        </h2>
      </div>
    </div>
  );
};


const PostButton = () => {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <div className="w-1/12">
        <Loader />
      </div>
    );
  }

  return (
    <button className="transition-all  text-lg font-semibold border-black hover:translate-x-[1px] cursor-pointer hover:shadow-[-3px_7px_0px_0px_rgba(0,0,0,1)] px-3.5 py-1 border ">
      Post
    </button>
  );
};

export default page;
