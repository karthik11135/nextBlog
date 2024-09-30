import React from "react";

const BlogSkeleton = () => {
  return (
    <div className=" border px-2 py-2.5 my-2 cursor-pointer">
      <h1 className="text-2xl bg-slate-100 rounded-full mb-3 font-black w-2/6 h-6"></h1>
      <p className="font-extralight h-4 mb-2 w-4/6 text-sm  bg-slate-100 rounded-full text-slate-800 "></p>
      <p className="font-extralight mb-2 h-4 w-4/6 text-sm bg-slate-100 rounded-full text-slate-800 "></p>
      <p className="font-extralight mb-2 h-4 w-1/12 text-sm bg-slate-200 rounded-full text-slate-800 "></p>
    </div>
  );
};

export default BlogSkeleton;
