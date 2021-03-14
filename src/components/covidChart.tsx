import * as React from "react";

import "./covidChart.css";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import CovidAPI, { HistoricalDataPoint } from "../covidApi";

export interface ChartData {
  name: string;
  cases: number;
}

export interface ICovidChartProps {}

export default function CovidChart(props: ICovidChartProps) {
  const [data, setData] = React.useState<ChartData[] | undefined>(undefined);

  const [showDeaths, setShowsDeaths] = React.useState(false);
  const [showCases, setShowsCases] = React.useState(true);

  React.useEffect(() => {
    CovidAPI.getHistoricData()
      .then((history) => {
        return history.map((h) => {
          return {
            name: h.date.toLocaleDateString(),
            cases: h.value,
            deaths: h.deaths,
          };
        });
      })
      .then((prepared) => {
        setData(prepared);
      });
  }, []);

  return data != null ? (
    <div className="covidChart">
      {data && (
        <LineChart
          className="lineChart"
          width={800}
          height={200}
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          data={data}
        >
          <CartesianGrid
            className="grid"
            strokeDasharray=""
            strokeWidth="1"
            color="white"
            fontSize="medium"
          />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {showCases && (
            <Line
              id="casesPlanet"
              type="monotone"
              dataKey="cases"
              stroke="rgb(49, 152, 170)"
              strokeWidth="5"
              dot={false}
            />
          )}
          {showDeaths && (
            <Line
              id="deathsPlanet"
              type="monotone"
              dataKey="deaths"
              stroke=" #961a1a"
              strokeWidth="5"
              dot={false}
            />
          )}
        </LineChart>
      )}
      <div className="buttons">
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
  ) : (
    <p>Loading data...</p>
  );
}
