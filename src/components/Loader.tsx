import React from "react";

const Loader = () => {
  return (
    <div className="flex space-x-2 rounded justify-center items-center h-6 bg-white  dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-2 w-2 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default Loader;
