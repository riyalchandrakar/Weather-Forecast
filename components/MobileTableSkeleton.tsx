export default function MobileTableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="
            animate-pulse rounded-2xl p-4
            bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100
            dark:from-slate-900 dark:to-slate-800
            border border-white/40 dark:border-white/10
          "
        >
          <div className="flex justify-between mb-3">
            <div className="h-4 w-32 bg-gray-300 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-20 bg-gray-300 dark:bg-zinc-700 rounded" />
          </div>

          <div className="flex justify-between">
            <div className="h-5 w-16 bg-gray-300 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-20 bg-gray-300 dark:bg-zinc-700 rounded" />
            <div className="h-4 w-20 bg-gray-300 dark:bg-zinc-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
