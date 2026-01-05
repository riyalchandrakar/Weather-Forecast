import { WeatherResponse } from "@/types/weather";

export default function WeatherCard({
  data,
  units
}: {
  data: WeatherResponse;
  units: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
      <h2 className="text-xl font-bold">{data.name}</h2>
      <p>{data.weather[0].main}</p>
      <p>
        {data.main.temp}°{units === "metric" ? "C" : "F"}
      </p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind: {data.wind.speed} m/s</p>
    </div>
  );
}
