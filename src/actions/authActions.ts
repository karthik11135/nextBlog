"use server";

import prisma from "@/lib/db";
import { signupSchema } from "@/lib/zodTypes";

export const signupAction = async (prevState: {message: string, ok: boolean | null}, formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const validate = signupSchema.safeParse({ email, name, password });

  if (!validate.success) {
    console.log(validate);
    console.log("couldnt validate");
    return { message: "Invalid inputs", ok: false };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          email,
          password,
          name,
        },
      });
       console.log("SUCCESSSSS")
      return { message: "User created", ok: true, email, name };
    } else {
      return { message: "User already exists", ok: false };
    }
  } catch (err) {
    console.log(err);
    return { message: "some error occured", ok: false };
  }
};
