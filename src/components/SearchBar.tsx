import { useCallback, useRef, useState } from "react";
import { ACCU_WEATHER_KEY, OPEN_WEATHER_KEY } from "../common";
import { useDebounce, useOnClickOutside } from "../helpers/hooks";

function SearchBar({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<any>>;
}): JSX.Element {
  const [value, setValue] = useState("");
  const [autocomplete, setAutocomplete] = useState([]);
  const ref = useRef<HTMLDivElement>(null);
  useDebounce(
    () => {
      if (value.length > 0) {
        fetch(
          `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${ACCU_WEATHER_KEY}&q=${value}`,

          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then(setAutocomplete)
          .catch((error) => console.log("error", error));
      } else {
        setAutocomplete([]);
      }
    },
    [value],
    800
  );

  useOnClickOutside(ref, () => setAutocomplete([]));

  const handleChoose = useCallback(
    (name: string) => {
      fetch(
        `http://api.openweathermap.org/data/2.5/weather?appid=${OPEN_WEATHER_KEY}&q=${name}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then(setData)
        .catch((error) => console.log("error", error));
      setAutocomplete([]);
      setValue("");
    },
    [setData]
  );

  return (
    <div className="form-floating mb-3" ref={ref}>
      <input
        type="email"
        className="form-control"
        id="floatingInput"
        placeholder="PLease enter location"
        onChange={({ target }) => setValue(target.value)}
        value={value}
      />
      <label htmlFor="floatingInputt">Please enter location</label>
      {autocomplete.length > 0 && (
        <ul className="list-group position-absolute w-100 top-5">
          {autocomplete.map((c: any) => (
            <li
              className="list-group-item list-group-item-action"
              key={c.Key}
              onClick={() => handleChoose(c.LocalizedName)}
            >
              {c.LocalizedName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
