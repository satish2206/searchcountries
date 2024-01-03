import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getCountries = async () => {
    try {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      console.log(data[0].name.common);
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  const filteredCountries = searchQuery
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : countries;

  return (
    <div className="App">
      <div className="search">
        <input
          id="outlined-basic"
          className="search-input"
          placeholder="Search for countries"
          type="text"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="containerStyle">
        {filteredCountries.map((country) => (
          <div key={country.cca3} className="cardstyle">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              className="imageStyle"
            />
            <h2>{country.name.common}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
