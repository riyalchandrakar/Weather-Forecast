export default function Skeleton() {
  return (
    <div
      className="
        animate-pulse rounded-3xl p-6
        bg-white/70 dark:bg-white/5
        backdrop-blur-xl
        border border-black/5 dark:border-white/10
        shadow-xl
      "
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gray-300/70 dark:bg-zinc-700/70" />
        <div className="h-4 w-32 rounded bg-gray-300/70 dark:bg-zinc-700/70" />
      </div>

      {/* Sub heading */}
      <div className="mt-3 h-3 w-24 rounded bg-gray-300/60 dark:bg-zinc-700/60" />

      {/* Temperature */}
      <div className="mt-6 flex items-end gap-2">
        <div className="h-14 w-24 rounded-lg bg-gray-300/70 dark:bg-zinc-700/70" />
        <div className="h-6 w-10 rounded bg-gray-300/60 dark:bg-zinc-700/60" />
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-gray-300/60 dark:bg-zinc-700/60" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gray-300/70 dark:bg-zinc-700/70" />
          <div className="h-4 w-20 rounded bg-gray-300/70 dark:bg-zinc-700/70" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full bg-gray-300/70 dark:bg-zinc-700/70" />
          <div className="h-4 w-20 rounded bg-gray-300/70 dark:bg-zinc-700/70" />
        </div>
      </div>
    </div>
  );
}
