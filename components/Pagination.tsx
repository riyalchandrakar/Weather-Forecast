type Props = {
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
};

export default function Pagination({ page, setPage, totalPages }: Props) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="
          rounded-lg px-4 py-2 text-sm font-medium
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-zinc-900
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-zinc-800
          disabled:opacity-40 disabled:cursor-not-allowed
          transition
        "
      >
        ← Prev
      </button>

      {/* Page indicator */}
      <div
        className="
          min-w-[80px] text-center
          rounded-lg px-3 py-2 text-sm font-semibold
          bg-gradient-to-r from-sky-500 to-indigo-500
          text-white shadow
        "
      >
        {page} / {totalPages}
      </div>

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="
          rounded-lg px-4 py-2 text-sm font-medium
          border border-gray-300 dark:border-gray-700
          bg-white dark:bg-zinc-900
          text-gray-700 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-zinc-800
          disabled:opacity-40 disabled:cursor-not-allowed
          transition
        "
      >
        Next →
      </button>
    </div>
  );
}
