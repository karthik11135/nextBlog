import React from "react";
import Link from "next/link";

const loading = () => {
  return (
    <div className="mx-auto w-full grid my-10 grid-cols-12 gap-4">
      <div className="col-span-8">
        <div className="flex mb-8 pe-1">
          <h1 className="font-bold text-4xl bg-slate-100 h-12 w-3/6 rounded-lg"></h1>
          <Link
            href="/"
            className="ms-auto flex items-center underline px-2 cursor-pointer"
          ></Link>
        </div>
        <p className="px-1 w-full h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-5/6 h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-full h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-full h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-full h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-5/6 h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-full h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-4/6 h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-full h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-5/6 h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-full h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
        <p className="px-1 w-full h-5 bg-slate-100 rounded-lg text-lg antialiased prose tracking-wider leading-8 break-keep mb-1"></p>
      </div>
      <div className="col-span-4 py-2 w-3/6 h-8 mx-auto text-center  px-2 bg-slate-100 rounded-lg"></div>
    </div>
  );
};

export default loading;
