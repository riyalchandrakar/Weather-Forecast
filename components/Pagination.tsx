type Props = {
  page: number;
  setPage: (p: number) => void;
  totalPages: number;
};

export default function Pagination({ page, setPage, totalPages }: Props) {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 border rounded disabled:opacity-40"
      >
        Prev
      </button>

      <span className="px-4 py-2">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 border rounded disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
