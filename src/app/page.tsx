import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOps } from "../lib/auth";
import * as motion from "framer-motion/client";

export default async function Home() {
  const session = await getServerSession(authOps);
  let text: string[] = [];
  if (session) {
    text = `Hello ${session.user.name}!!!`.split("");
  }

  if (!session) {
    return (
      <div className="mx-auto w-1/6 my-20">
        Log in first
        <Link href={"/login"} className="underline mx-2 text-purple-600">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto my-20">
      <div className="text-7xl mb-10 flex font-semibold items-center ">
        {text.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              delay: i / 10,
            }}
            key={i}
          >
            {el}
            {"  "}
          </motion.span>
        ))}
      </div>
      <div className="text-center  flex items-center  py-2">
        <Link
          className=" text-3xl font-extralight hover:translate-x-[1px] transition-all cursor-pointer hover:shadow-[-4px_8px_0px_0px_rgba(0,0,0,1)] px-5 py-2 border border-black "
          href={"/blogs"}
        >
          Blogs
        </Link>
      </div>
    </div>
   
  );
}
