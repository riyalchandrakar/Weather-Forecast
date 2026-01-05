export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

export interface ForecastResponse {
  list: {
    dt_txt: string;
    main: { temp: number };
    weather: { main: string; icon: string }[];
  }[];
}
