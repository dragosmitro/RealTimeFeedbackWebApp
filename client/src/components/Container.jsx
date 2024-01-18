import React from "react";

export const CenteredContainer = ({ children }) => {
  return (
    <div className="flex justify-center items-center h-full mt-[5%]">
      <div className="bg-white p-10 drop-shadow-lg border-blue-400 border-solid border-t-0 border-l-0 border-[5px]">
        {children}
      </div>
    </div>
  );
};
