import * as React from "react";
import "./globalCurrentStats.css";
import CovidAPI, { GlobalCurrentStatsAll } from "../covidApi";

interface IGlobalCurrentStatsProps {}

export default function GlobalCurrentStats(props: IGlobalCurrentStatsProps) {
  const [stats, setStats] = React.useState<GlobalCurrentStatsAll | null>(null);
  React.useEffect(() => {
    CovidAPI.getGlobalCurrent().then(setStats);
  }, []);
  return (
    <div className="currentStats">
      <div className="total">
        <div> total cases: {stats?.cases}</div>
        <div> total deaths: {stats?.deaths}</div>
        <div> total recovered: {stats?.recovered}</div>
      </div>
      <div className="today">
        <div>today cases: {stats?.todayCases}</div>
        <div>today deaths: {stats?.todayDeaths}</div>
        <div>today recovered: {stats?.todayRecovered}</div>
      </div>
      <div className="otherStats">
        <div>active: {stats?.active}</div>
        <div>critical: {stats?.critical}</div>
        <div>tests: {stats?.tests}</div>
      </div>
    </div>
  );
}
