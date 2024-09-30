import React from "react";
import { fetchBlogAction } from "@/actions/blogActions";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOps } from "@/lib/auth";

export const revalidate = 200;

interface blogIdProps {
  params: {
    blogId: string;
  };
}

const page = async ({ params: { blogId } }: blogIdProps) => {
  const session = await getServerSession(authOps);
  const res = await fetchBlogAction(blogId);

  if (!session) {
    redirect("/login");
  }

  if (!res.ok) {
    notFound();
  }

  return (
    <div className="mx-auto w-full grid my-10 grid-cols-12 gap-4">
      <div className="col-span-8">
        <div className="flex mb-5 pe-1">
          <h1 className="font-bold text-4xl">{res.blog?.title}</h1>
          <Link
            href="/blogs"
            className="ms-auto flex items-center underline px-2 cursor-pointer"
          >
            Go back
          </Link>
        </div>
        <p className="px-1 text-lg antialiased prose tracking-wider leading-8 break-keep">
          {res.blog?.content}
        </p>
      </div>
      <div className="col-span-4 py-2 border-2 w-3/6 mx-auto text-center  border-black px-2 bg-yellow-200 h-fit">
        {session.user.name}
      </div>
    </div>
  );
};

export default page;
