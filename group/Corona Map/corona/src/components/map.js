import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import CountryMarker from "./countryMarker";
import { nanoid } from "nanoid";
// import "leaflet/dist/leaflet.css";

const Map = () => {
  const [countryData, setCountryData] = useState([]);
  const defaultPosition: LatLngExpression = [20, -30]; // Paris position
  const mapBounds: LatLngBoundsExpression = [[-85.0511, -180], [85.0511, 180]];

  // const map = useMap();
  // map.fitBounds(mapBounds);

  useEffect(() => {
    fetch("http://localhost:4000/countries").then((res) =>
      res.json().then((data) => {
        setCountryData(data);
      })
    );
  }, []);


  // console.log(countryData);

  return (
    <div className="map__container">
      <MapContainer
        center={defaultPosition}
        maxBounds={mapBounds}
        zoom={3}
        minZoom={3}
        maxZoom={5}
        maxBoundsViscosity={1.0}
        style={{
          height: "70vh",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countryData.map((country) =>
          <CountryMarker key={`marker-${nanoid()}`} country={country} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
// export { MapView };
