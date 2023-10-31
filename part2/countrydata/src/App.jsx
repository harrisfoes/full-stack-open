import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [countriesMatched, setCountriesMatched] = useState([]);
  const [countryQueried, setCountryQueried] = useState({});

  useEffect(() => {
    if (allCountries) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then((response) => {
          //console.log(response.data);
          setAllCountries(response.data);
        });
    }
  }, []);

  useEffect(() => {
    if (countriesMatched.length == 1) {
      console.log("it works!!", countriesMatched);
      const countryMatchName = countriesMatched[0];
      const completeCountryData = allCountries.filter((country) => {
        console.log(country.name);
        console.log(countryMatchName);
        return (
          country.name.common.toLowerCase() === countryMatchName.toLowerCase()
        );
      });
      console.log(completeCountryData);
      setCountryQueried(completeCountryData[0]);
    } else {
      setCountryQueried({});
    }
  }, [countriesMatched]);

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
        ? countriesMatched.map((country) => <div key={country}>{country}</div>)
        : ""}
      {Object.keys(countryQueried).length > 0 ? (
        <>
          {" "}
          <h1>{countryQueried.name.common}</h1>
          <div>capital: {countryQueried.capital}</div>
          <div>area: {countryQueried.area}</div>
          <h2>languages:</h2>
          <ul>
            {Object.values(countryQueried.languages).map((langs) => (
              <li key={langs}>{langs}</li>
            ))}
          </ul>
          <div>TODO: Flag, weather temperature, wind</div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default App;
