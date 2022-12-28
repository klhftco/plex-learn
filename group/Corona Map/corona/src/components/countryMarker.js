import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';
import { Marker, Popup } from "react-leaflet";


function CountryMarker({ country }) {
  const markerIcon = new Icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

  // console.log(country);

  // country, countryInfo [lat][long][flag], cases, todayCases, deaths, todayDeaths,
  const name = country['country'];
  const flag = country['countryInfo']['flag'];
  const countryPos: LatLngExpression = [country['countryInfo']['lat'], country['countryInfo']['long']];

  return (
    <Marker
      position={countryPos}
      icon={markerIcon}
    >
      <Popup>
        <div className="countryInfo">
          <div className="country">
            <h1>{name}</h1>
            <img className="flag" src={flag} />
          </div>
          <div className="stats">
            <p>Total # of Cases: <span className="red">{country['cases']}</span></p>
            <p>Total # of Deaths: <span className="red">{country['deaths']}</span></p>
            <h3>Today's Stats</h3>
            <p># of Cases Today: <span className="red">{country['todayCases']}</span></p>
            <p># of Deaths Today: <span className="red">{country['todayDeaths']}</span></p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default CountryMarker;
