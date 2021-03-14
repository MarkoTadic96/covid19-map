import * as React from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
  useMapEvents,
} from "react-leaflet";
import CovidAPI, { CountryStats } from "../covidApi";
import mock_all from "../MOCK_ALL_COUNTRIES.json";

interface ICovidMapProps {
  onPopup?: (country: CountryStats) => void;
}

const CovidMap: React.FunctionComponent<ICovidMapProps> = ({ onPopup }) => {
  const [countries, setCountries] = React.useState<CountryStats[] | null>(null);

  React.useEffect(() => {
    let shouldUpdate = true;

    CovidAPI.getAllCountries().then((stats) => {
      if (shouldUpdate) {
        setCountries(stats);
      }
    });

    return () => {
      shouldUpdate = false;
    };
  }, []);

  return countries != null ? (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={3}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "full" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {countries.map((country, index) => {
        return (
          <Marker
            key={index}
            position={[
              +country.coordinates.latitude,
              +country.coordinates.longitude,
            ]}
          >
            <Popup
              onOpen={() => {
                if (onPopup != null) {
                  onPopup(country);
                }
              }}
            >
              Country: {country.country} <br></br>
              {country.county && `County: ${country.county}`}
              {country.province && `Province ${country.province}`}
              {(country.province || country.county) && <br></br>}
              Cases: {country.stats.confirmed}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  ) : (
    <p>No data.</p>
  );
};

export default CovidMap;
