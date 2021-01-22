import React from "react";

export default function SearchInput() {
  return (
    <div className="w-full flex border border-gray-200 rounded-full p-4 shadow text-xl">
      <div>🔎</div>
      <input type="text" className="w-full outline-none px-3" />
    </div>
  );
}
