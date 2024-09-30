import React from "react";

interface blogProps {
  title: string;
  content: string;
  author: string;
  owner: boolean;
}

const randomNumGenerator = () => {
  return Math.floor(Math.random() * 255) + 1;
};

const Blog = ({ title, content, author, owner }: blogProps) => {
  const color = `rgb(${randomNumGenerator()}, ${randomNumGenerator()}, ${randomNumGenerator()})`;
  return (
    <div
      className={`relative  border border-black px-2 py-2.5 my-2 cursor-pointer`}
    >
      {owner && (
        <div className="absolute p-1.5 text-white top-0 right-0 rounded-bl-md bg-green-700 font-bold">
          Mine
        </div>
      )}
      <h1 className="text-3xl bg-slate- mb-3 font-black">{title}</h1>
      <p className="font-extralight mb-2 text-slate-800 ">
        {content.slice(0, 200) + "..."}
      </p>
      <p style={{ color: color }} className="text-sm">
        Author | {author}
      </p>
    </div>
  );
};

export default Blog;
