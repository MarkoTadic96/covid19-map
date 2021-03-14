import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import CovidMap from "./components/map";
import CovidAPI, { CountryStats } from "./covidApi";
import CountryDetails from "./components/countryDetails";
import CovidChart from "./components/covidChart";
import GlobalCurrentStats from "./components/globalCurrentStats";
import Header from "./components/header";

function App() {
  const [selectedCountry, setSelectedCountry] = useState<CountryStats | null>(
    null
  );
  return (
    <div>
      <Header></Header>
      <div className="App">
        <GlobalCurrentStats></GlobalCurrentStats>
        <div className="map">
          <CovidMap
            onPopup={(country) => {
              setSelectedCountry(country);
            }}
          ></CovidMap>{" "}
        </div>

        {selectedCountry != null && (
          <CountryDetails country={selectedCountry}></CountryDetails>
        )}
        <CovidChart></CovidChart>
      </div>
    </div>
  );
}

export default App;
