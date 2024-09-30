import CredentialsProvider from "next-auth/providers/credentials";
import { JWT, NextAuthOptions } from "next-auth";
import prisma from "./db";
import { loginSchema } from "./zodTypes";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      image: string | undefined;
      email: string;
      id: number;
    };
  }

  interface User {
    id?: number;
  }

  interface JWT {
    id?: number;
  }
}

export const authOps = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "john@gmail.com" },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(creds: any): Promise<any> {
        try {
          const loginDetails = {
            email: creds.email,
            password: creds.password,
          };

          const { success } = loginSchema.safeParse(loginDetails);

          if (!success) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: { email: creds.email },
            select: {
              password: true,
              id: true,
              name: true,
            },
          });

          if (user && user.password && creds.password === user.password) {
            return {
              email: creds.email,
              name: user.name,
              id: user.id,
            };
          }

          return null;
        } catch (err) {
          console.log(err);
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET || "Secret",

  callbacks: {
    jwt: async ({ token, user }): Promise<any> => {
      const newToken = token;
      if (user) {
        newToken.id = user.id;
      }
      return newToken;
    },
    session: async ({ session, token }): Promise<any> => {
      const newSession = session;
      newSession.user.id = token.id as number;
      return newSession;
    },
  },

  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;
