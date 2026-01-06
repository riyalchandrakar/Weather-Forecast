export default function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-t animate-pulse">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <td key={colIndex} className="p-3">
              <div className="h-4 bg-gray-300 dark:bg-zinc-700 rounded w-full" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
