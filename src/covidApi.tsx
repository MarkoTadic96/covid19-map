import mock_all from "./MOCK_ALL_COUNTRIES.json";

export interface CountryStats {
  country: string;
  county: string | null;
  province: string | null;
  stats: Stats;
  coordinates: Coordinates;
}

export interface GlobalCurrentStatsAll {
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  tests: number;
}

interface HistoricalStats {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

export interface HistoricalDataPoint {
  date: Date;
  value: number;
  deaths: number;
}

interface HistoricalCountryStats {
  timeline: {
    cases: Record<string, number>;
    deaths: Record<string, number>;
    recovered: Record<string, number>;
  };
}

export interface HistoricalCountryDataPoint {
  date: Date;
  cases: number;
  deaths: number;
}

interface Stats {
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}

export interface YeesterdayData {
  cases: string;
  todayCases: string;
  deaths: string;
}

export default class CovidAPI {
  static getAllCountries(): Promise<CountryStats[]> {
    return fetch("https://disease.sh/v3/covid-19/jhucsse").then((r) =>
      r.json()
    );
  }

  static getGlobalCurrent(): Promise<GlobalCurrentStatsAll> {
    return fetch("https://disease.sh/v3/covid-19/all?yesterday=true").then(
      (r) => (r.json() as unknown) as GlobalCurrentStatsAll
    );
  }

  static getHistoricData(): Promise<HistoricalDataPoint[]> {
    return fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
      .then((response) => (response.json() as unknown) as HistoricalStats)
      .then((data) => {
        const deaths = Object.entries(data.deaths);
        return Object.entries(data.cases)
          .map(([k, v]) => {
            return {
              date: new Date(k),
              value: v,
              deaths: deaths.find(([d, _]) => d === k)?.[1] ?? 0,
            };
          })
          .sort((a, b) => a.date.getTime() - b.date.getTime());
      });
  }
  static getHistoricCountryData(
    country: string
  ): Promise<HistoricalCountryDataPoint[]> {
    return fetch(
      `https://disease.sh/v3/covid-19/historical/${country}?lastdays=30`
    )
      .then(
        (response) => (response.json() as unknown) as HistoricalCountryStats
      )
      .then((data) => {
        const deaths = Object.entries(data.timeline.deaths);
        return Object.entries(data.timeline.cases)
          .map(([date, cases]) => {
            return {
              date: new Date(date),
              cases: cases,
              deaths: deaths.find(([d, _]) => d === date)?.[1] ?? 0,
            };
          })
          .sort((a, b) => a.date.getTime() - b.date.getTime());
      });
  }
}
