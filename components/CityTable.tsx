import Pagination from "./Pagination";

const cities = Array.from({ length: 25 }, (_, i) => `City ${i + 1}`);

export default function CityTable({
  page,
  setPage,
}: {
  page: number;
  setPage: (p: number) => void;
}) {
  const start = (page - 1) * 5;
  const visible = cities.slice(start, start + 5);

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-2">Cities</h2>
      <table className="w-full border">
        <tbody>
          {visible.map((city) => (
            <tr key={city} className="border">
              <td className="p-2">{city}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
