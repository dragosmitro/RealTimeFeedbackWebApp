import React from "react";

export const Emoji = ({ emoji, counters = false, value = 0 }) => {
  return (
    <React.Fragment>
      <div
        className={`relative bg-blue-400 flex items-center justify-center w-[80px] h-[80px] rounded-xl ${
          !counters ? "hover:bg-blue-500" : ""
        }`}
      >
        {counters && (
          <div className="text-white absolute top-2 left-2">{value}</div>
        )}
        <p className="text-2xl">{emoji}</p>
      </div>
    </React.Fragment>
  );
};
