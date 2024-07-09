"use client";

import { useState } from "react";
import Link from "next/link";

const CreateButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setShowOptions(false)}>
      <div className={`flex flex-col gap-2 items-end justify-end`}>
        {showOptions && (
          <>
            <Link
              href="/create/color"
              className="bg-blue-500 text-white rounded-lg w-fit h-fit px-2 py-1 flex items-center justify-center text-l no-underline hover:shadow-lg tooltip tooltip-left"
              data-tip="(boring proof of multi-format concept)"
            >
              +Color
            </Link>
            <Link
              href="/create/tree"
              className="tooltip tooltip-left bg-green-500 text-white rounded-lg w-fit h-fit px-2 py-1 flex items-center justify-center text-l no-underline hover:shadow-lg"
              // data-tip="Make a new binary tree post"
            >
              +Tree
            </Link>
          </>
        )}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl border-none cursor-pointer hover:shadow-lg pb-0.5"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default CreateButton;
