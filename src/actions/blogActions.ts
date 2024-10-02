"use server";

import prisma from "@/lib/db";
import { blogSchema, blogType } from "@/lib/zodTypes";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOps } from "@/lib/auth";

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

export const postBlogAction = async (
  initiaState: { message: string; ok: boolean | null },
  formData: FormData
) => {
  const blogDetails: blogType = {
    title: (formData.get("title") as string).trim(),
    content: (formData.get("content") as string).trim(),
  };
  if (blogDetails.title === "" || blogDetails.content === "")
    return { message: "something went wrong", ok: false };

  const { success } = blogSchema.safeParse(blogDetails);

  if (!success) {
    return { message: "Invalid inputs have been sent", ok: false };
  }

  try {
    const userId = parseInt(formData.get("userId") as string);
    await prisma.blog.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        userId: userId,
      },
    });

    revalidatePath("/blogs");
  } catch (err) {
    console.log(err);
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
        user: {
          select: {
            name: true,
          },
        },
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

export const updatedBlogAction = async (
  initialState: { message: string; ok: boolean | null },
  formData: FormData
) => {
  const updatedTitle = formData.get("title") as string;
  const updatedContent = formData.get("content") as string;
  const blogId = Number(formData.get("blogId"));
  const session = await getServerSession(authOps);

  if(!session) return {message: "Not logged", ok: false}

  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
      userId: session.user.id,
    },
  });

  if (!blog) {
    return { message: "You can't fool us", ok: false };
  }

  try {
    await prisma.blog.update({
      where: {
        id: blogId,
      },
      data: {
        title: updatedTitle,
        content: updatedContent,
      },
    });
    revalidatePath("/blogs");
    return { message: "Blog updated", ok: true };
  } catch (err) {
    console.log(err);
    return { message: "Network error", ok: false };
  }
};
