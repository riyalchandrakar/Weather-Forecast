"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark((v) => !v)}
      aria-label="Toggle theme"
      className="
        relative inline-flex items-center
        h-10 w-20 rounded-full p-1
        bg-gradient-to-r from-sky-400 to-indigo-500
        dark:from-slate-700 dark:to-slate-900
        shadow-md transition
        focus:outline-none focus:ring-2 focus:ring-sky-500
      "
    >
      {/* Knob */}
      <span
        className={`
          absolute left-1 flex h-8 w-8 items-center justify-center
          rounded-full bg-white text-yellow-500
          shadow transition-transform duration-300
          ${dark ? "translate-x-10 text-indigo-600" : ""}
        `}
      >
        {dark ? <Moon size={16} /> : <Sun size={16} />}
      </span>

      {/* Icons background (optional hint) */}
      <span className="flex w-full justify-between px-2 text-white/80 text-xs">
        <Sun size={14} />
        <Moon size={14} />
      </span>
    </button>
  );
}
