import React from "react";
import { PrevIcon, NextIcon } from "./Icons";

const Pagination: React.FC = () => {
  return (
    <nav
      className="inline-flex gap-1 items-center justify-center"
      aria-label="Pagination"
    >
      <button
        className="flex justify-center items-center p-2.5 w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Previous page"
      >
        <PrevIcon />
      </button>
      <button
        className="flex justify-center items-center p-2.5 w-8 h-8 text-sm font-bold text-gray-600 bg-zinc-200 rounded-full hover:bg-zinc-300 transition-colors"
        aria-current="page"
      >
        1
      </button>
      <button
        className="flex justify-center items-center p-2.5 w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Next page"
      >
        <NextIcon />
      </button>
    </nav>
  );
};

export default Pagination;
