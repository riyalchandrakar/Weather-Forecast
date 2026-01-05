"use client";
import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (c: string) => void }) {
  const [value, setValue] = useState("");

  return (
    <div className="flex gap-2 my-4">
      <input
        className="flex-1 p-2 rounded border"
        placeholder="Enter city"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button
        onClick={() => onSearch(value)}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Search
      </button>
    </div>
  );
}
