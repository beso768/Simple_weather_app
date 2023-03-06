import React, { useEffect, useState } from "react";
import { OPEN_WEATHER_KEY } from "../common";
import Forecast from "./Forecast";
import SearchBar from "./SearchBar";

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${OPEN_WEATHER_KEY}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then(setData)
          .catch((error) => console.log("error", error));
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <div className="p-5">
      <SearchBar setData={setData} />
      <Forecast data={data} />
    </div>
  );
}
