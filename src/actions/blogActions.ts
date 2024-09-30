"use server";

import prisma from "@/lib/db";
import { blogSchema, blogType } from "@/lib/zodTypes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getBlogsAction = async () => {
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        title: true,
        content: true,
        id: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    return blogs;
  } catch (err) {
    console.log("came heree to the error block");
    console.log(err);
  }
};

export const postBlogAction = async (initiaState: any, formData: FormData) => {
  const blogDetails: blogType = {
    title: (formData.get("title") as string).trim(),
    content: (formData.get("content") as string).trim(),
  };
  if (blogDetails.title === "" || blogDetails.content === "") return;

  const { success } = blogSchema.safeParse(blogDetails);

  if (!success) {
    return { message: "Invalid inputs have been sent", ok: false };
  }

  try {
    const userId = parseInt(formData.get("userId") as string);
    const newBlog = await prisma.blog.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        userId: userId,
      },
    });

    revalidatePath("/blogs");
    // redirect("/blogs");
  } catch (err) {
    return { message: "Network error occurred", ok: false };
  }

  return { message: "Successfully posted", ok: true };
};

export const fetchBlogAction = async (blogId: string) => {
  const blogIdnum = Number(blogId);
  if (!blogIdnum) {
    return { blog: undefined, ok: false };
  }
  try {
    const blogFetched = await prisma.blog.findUnique({
      where: {
        id: blogIdnum,
      },
      select: {
        title: true,
        content: true,
      },
    });
    if (blogFetched) {
      return { blog: blogFetched, ok: true };
    }
  } catch (err) {
    console.log(err);
  }
  return { ok: false, blog: undefined };
};
