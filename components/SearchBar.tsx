"use client";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export default function SearchBar({
  onSearch,
}: {
  onSearch: (c: string) => void;
}) {
  const [value, setValue] = useState("");

  return (
    <div
      className="
        my-6 flex items-center gap-3
        rounded-2xl p-3
        bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100
        dark:from-slate-900 dark:via-slate-800 dark:to-slate-900
        border border-white/40 dark:border-white/10
        shadow-md backdrop-blur-md
      "
    >
      {/* Input */}
      <div className="relative flex-1">
        <MapPin
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-500"
        />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search city (e.g. Delhi)"
          className="
            w-full rounded-xl pl-10 pr-4 py-2
            bg-white/70 dark:bg-zinc-900/70
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-500 dark:placeholder:text-gray-400
            border border-gray-300/60 dark:border-gray-700
            focus:outline-none focus:ring-2 focus:ring-sky-500
            transition
          "
        />
      </div>

      {/* Button */}
      <button
        onClick={() => value.trim() && onSearch(value.trim())}
        className="
          flex items-center gap-2
          rounded-xl px-4 py-2
          bg-gradient-to-r from-sky-500 to-indigo-500
          text-white font-medium
          hover:opacity-90 active:scale-95
          transition
        "
      >
        <Search size={18} />
        <span className="hidden sm:inline">Search</span>
      </button>
    </div>
  );
}
