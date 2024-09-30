import { authOps } from "@/lib/auth";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOps);

export { handler as GET, handler as POST };
