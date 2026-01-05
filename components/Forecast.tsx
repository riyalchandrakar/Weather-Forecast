import { ForecastResponse } from "@/types/weather";

export default function Forecast({
  data,
  units,
}: {
  data: ForecastResponse;
  units: string;
}) {
  const daily = data.list.filter((_, i) => i % 8 === 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
      {daily.map((item) => (
        <div
          key={item.dt_txt}
          className="bg-white dark:bg-gray-800 p-4 rounded text-center"
        >
          <p className="text-sm">{item.dt_txt.split(" ")[0]}</p>
          <p className="font-bold">
            {item.main.temp}°{units === "metric" ? "C" : "F"}
          </p>
          <p className="text-xs">{item.weather[0].main}</p>
        </div>
      ))}
    </div>
  );
}
