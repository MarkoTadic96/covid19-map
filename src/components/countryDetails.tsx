import * as React from "react";
import { CountryStats } from "../covidApi";
import "./countryDetails.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import CovidAPI, { HistoricalCountryDataPoint } from "../covidApi";

import { ChartData } from "./covidChart";

interface ICountryDetailsProps {
  country: CountryStats;
}

export default function CountryDetails(props: ICountryDetailsProps) {
  const [data, setData] = React.useState<ChartData[] | undefined>(undefined);
  const [showDeaths, setShowsDeaths] = React.useState(false);
  const [showCases, setShowsCases] = React.useState(true);

  React.useEffect(() => {
    setData(undefined);
    CovidAPI.getHistoricCountryData(props.country.country)
      .then((history) => {
        return history.map((h) => {
          return {
            name: h.date.toLocaleDateString(),
            cases: h.cases,
            deaths: h.deaths,
          };
        });
      })
      .then((prepared) => {
        setData(prepared);
      });
  }, [props.country]);

  return (
    <div className="countryDetailAll">
      {data != null ? (
        <>
          <div className="countryDetailStyle">
            {" "}
            <div className="countryName">
              <div> country: {props.country.country} </div>
              <div> {props.country.county} </div>
              <div> {props.country.province} </div>
            </div>
            <div className="countrySituation">
              <div>confirmed cases: {props.country.stats.confirmed}</div>
              <div>confirmed deaths: {props.country.stats.deaths}</div>
              <div>recovered: {props.country.stats.recovered}</div>
            </div>
            <div className="position">
              <div>longitude: {props.country.coordinates.longitude}</div>
              <div>latitude: {props.country.coordinates.latitude}</div>
            </div>
          </div>
          <div className="countryChart">
            {data && (
              <LineChart
                className="lineChart2"
                width={800}
                height={200}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                data={data}
              >
                <CartesianGrid strokeDasharray="" strokeWidth="1" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {showCases && (
                  <Line
                    dot={false}
                    color="white"
                    type="monotone"
                    dataKey="cases"
                    stroke="rgb(49, 152, 170)"
                    strokeWidth="4"
                  />
                )}
                {showDeaths && (
                  <Line
                    dot={false}
                    color="white"
                    type="monotone"
                    dataKey="deaths"
                    stroke="#961a1a"
                    strokeWidth="4"
                  />
                )}
              </LineChart>
            )}
            <div className="buttons">
              {" "}
              <button
                className="buttonDeaths"
                onClick={() => setShowsDeaths(!showDeaths)}
              >
                {" "}
                {showDeaths ? "Hide Deaths" : "Show Deaths"}
              </button>
              <button
                className="buttonCases"
                onClick={() => setShowsCases(!showCases)}
              >
                {" "}
                {showCases ? "Hide cases" : "Show Cases"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <p className="loader">Loading data...</p>
      )}
    </div>
  );
}
