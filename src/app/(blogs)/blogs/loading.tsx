import BlogSkeleton from "@/components/skeletons/BlogSkeleton";
import React from "react";

const loading = () => {
  return (
    <div className="w-5/6 mx-auto">
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
    </div>
  );
};

export default loading;
