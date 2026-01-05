export default function Pagination({
  page,
  setPage,
}: {
  page: number;
  setPage: (p: number) => void;
}) {
  return (
    <div className="flex gap-2 justify-center mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 bg-gray-300 rounded"
      >
        Prev
      </button>
      <span>{page}</span>
      <button
        disabled={page === 5}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 bg-gray-300 rounded"
      >
        Next
      </button>
    </div>
  );
}
