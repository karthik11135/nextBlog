import React from "react";

import Blog from "@/components/Blog";
import BlogSkeleton from "@/components/skeletons/BlogSkeleton";
import { getServerSession } from "next-auth";
import { authOps } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getBlogsAction } from "@/actions/blogActions";
import Link from "next/link";

export const revalidate = 300;

const page = async () => {
  const session = await getServerSession(authOps);
  const blogs = await getBlogsAction();

  blogs?.reverse();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="w-5/6 mx-auto">
      {!blogs && <p>Network error</p>}
      {blogs?.map((eachBlog) => {
        return (
          <Link href={`/blogs/${eachBlog.id}`}>
            <Blog
              author={eachBlog.user.name}
              title={eachBlog.title}
              content={eachBlog.content}
              owner= {session.user.name === eachBlog.user.name ? true : false}
            />
          </Link>
        );
      })}
      {blogs?.length == 0 && <p>No blogs</p>}
    </div>
  );
};

export default page;
