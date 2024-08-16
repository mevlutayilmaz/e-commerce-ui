import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-7rem)]">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
