"use client";
import React, { useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

import { updatedBlogAction } from "@/actions/blogActions";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import Loader from "@/components/Loader";

const initialState: {
  message: string;
  ok: boolean | null;
} = {
  message: "",
  ok: null,
};

const UpdateBlog = ({ blogId }: { blogId: string }) => {
  const { data: session } = useSession();

  const searchParams = useSearchParams();
  const oTitle = searchParams.get("title") as string;
  const oContent = searchParams.get("content") as string;
  const userName = searchParams.get("owner");

  
  const [updatedTitle, setUpdatedTitle] = useState(oTitle);
  const [updatedContent, setUpdatedContent] = useState(oContent);
  
  const [state, formAction] = useFormState(updatedBlogAction, initialState);
  
  if (!session) {
    redirect("/login");
  }

  if (session.user.name !== userName) {
    return <div>You do not have access to this page</div>;
  }
  if (state.ok) {
    redirect("/blogs");
  }

  return (
    <div className="w-3/6 mx-auto border my-2 px-4 py-3">
      <h1 className="text-3xl my-4 text-slate-700 ">Update your form</h1>
      <form action={formAction} className="col-span-8 text-black py-2">
        <input
          type="text"
          className="font-light mb-10 text-5xl py-2 focus:outline-none border-b"
          placeholder="Title"
          name={"title"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUpdatedTitle(e.currentTarget.value)
          }
          value={updatedTitle}
        />
        <br />
        <textarea
          className="focus:outline-none border-b mb-4 w-full text-lg font-extralight"
          placeholder="Write your content here"
          rows={6}
          name="content"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setUpdatedContent(e.currentTarget.value)
          }
          value={updatedContent}
        ></textarea>
        <input hidden name={"blogId"} value={blogId}></input>
        <input name="userId" readOnly className="hidden" />
        <p className="py-2 font-extralight text-blue-500">{state.message}</p>
        <PostButton />
      </form>
    </div>
  );
};

export default UpdateBlog;

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
      Update
    </button>
  );
};
