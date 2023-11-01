import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import CountryQuery from "./components/CountryQuery.jsx";
import CountryData from "./components/CountryData.jsx";
import WeatherData from "./components/WeatherData.jsx";
import countryService from "./services/countries";

const App = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countriesMatched, setCountriesMatched] = useState([]);
  const [countryQueried, setCountryQueried] = useState({});
  const [weatherData, setWeatherData] = useState({});
  const api_key = import.meta.env.VITE_SOME_KEY;

  useEffect(() => {
    if (allCountries) {
      countryService.getAll().then((initialNotes) => {
        //console.log(initialNotes);
        setAllCountries(initialNotes);
      });
    }
  }, []);

  useEffect(() => {
    if (countriesMatched.length == 1) {
      const countryMatchName = countriesMatched[0];
      const completeCountryData = allCountries.filter((country) => {
        //console.log(country.name);
        //console.log(countryMatchName);
        return (
          country.name.common.toLowerCase() === countryMatchName.toLowerCase()
        );
      });
      //console.log(completeCountryData);
      setCountryQueried(completeCountryData[0]);
    } else {
      setCountryQueried({});
    }
  }, [countriesMatched]);

  useEffect(() => {
    if (Object.keys(countryQueried).length > 0) {
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=bc1c9de3a1544d53b1544128230810&q=${countryQueried.name.common}`
        )
        .then((response) => {
          console.log(response.data);
          setWeatherData(response.data);
        });
    }
  }, [countryQueried]);

  const handleSearch = (event) => {
    setSearchCountry(event.target.value);

    const filterCountries = allCountries
      .map((country) => {
        //console.log(country.name);
        return country.name.common;
      })
      .filter((countryName) => {
        return countryName.toLowerCase().includes(searchCountry.toLowerCase());
      });
    console.log(filterCountries);
    setCountriesMatched(filterCountries);
  };

  const handleShow = (country) => {
    console.log(country);
    setCountriesMatched([country]);
  };

  return (
    <div>
      find countries:
      <input type="text" onChange={handleSearch} value={searchCountry} />
      {countriesMatched.length > 10 && countriesMatched.length > 1 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        ""
      )}
      {countriesMatched.length <= 10 && countriesMatched.length > 1
        ? countriesMatched.map((country) => (
            <CountryQuery
              key={country}
              country={country}
              handleShow={() => handleShow(country)}
            />
          ))
        : ""}
      {Object.keys(countryQueried).length > 0 ? (
        <>
          {" "}
          <CountryData
            name={countryQueried.name.common}
            capital={countryQueried.capital}
            area={countryQueried.area}
            languages={countryQueried.languages}
            flagImg={countryQueried.flags.svg}
            flagAlt={countryQueried.flags.alt}
          />
          {Object.keys(weatherData).length > 0 ? (
            <>
              <WeatherData
                name={countryQueried.name.common}
                temp={weatherData.current.temp_c}
                wIcon={weatherData.current.condition.icon}
                wText={weatherData.current.condition.text}
                wind={weatherData.current.wind_mph}
              />
            </>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
