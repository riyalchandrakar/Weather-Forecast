export default function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-t border-black/5 dark:border-white/10 animate-pulse"
        >
          {/* City */}
          <td className="p-4">
            <div className="h-4 w-28 rounded bg-gray-300/70 dark:bg-zinc-700/70" />
          </td>

          {/* Temp */}
          <td className="p-4">
            <div className="h-4 w-14 rounded bg-gray-300/70 dark:bg-zinc-700/70" />
          </td>

          {/* Condition */}
          <td className="p-4">
            <div className="h-4 w-24 rounded bg-gray-300/70 dark:bg-zinc-700/70" />
          </td>

          {/* Humidity */}
          <td className="p-4">
            <div className="h-4 w-20 rounded bg-gray-300/70 dark:bg-zinc-700/70" />
          </td>

          {/* Wind */}
          <td className="p-4">
            <div className="h-4 w-20 rounded bg-gray-300/70 dark:bg-zinc-700/70" />
          </td>
        </tr>
      ))}
    </>
  );
}
