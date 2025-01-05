// Vorlage aus Hausaufgabe 7

import { renderToString } from "react-dom/server";
import { CssBaseline, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON, LayersControl } from "react-leaflet";

import { BASE_LAYERS } from "./baseLayers";

const OUTER_BOUNDS = [
  [47.335589, 8.421493],
  [47.431759, 8.64684],
];

const pointToLayer = ({ properties }, latlng) => {
  const radius = 10;
  return L.circleMarker(latlng, { radius: radius, color: "#9a0ffc" });
};

const onEachFeature = (feature, layer) => {
  if (feature.properties && feature.properties.Standortname) {
    const popup = <Popup {...feature} />;

    layer.bindPopup(renderToString(popup));
  }
};

function Popup({ properties, geometry }) {
  const [lon, lat, depth] = geometry.coordinates;

  return (
    <>
      <Typography variant="h2">{properties.Standortname}</Typography>
      <p>
        <strong>Datum:</strong>{" "}
        {new Intl.DateTimeFormat("de-DE", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(new Date(properties.Datum))}
        <br />
        <strong>Maximale Temperatur:</strong> {properties.Temperatur_max} °C
        <br />
        <strong>Luftdruck:</strong> {properties.Luftdruck} hPa
        <br />
        <strong>Regendauer:</strong> {properties.Regendauer} min.
        <br />
      </p>
    </>
  );
}

function Map({ date }) {
  const [meteoJSON, setMeteoJSON] = useState([]);

  //
  // Fetch
  useEffect(() => {
    const url = `api/date?time_str=${date}`;
    fetchMeteoData(url);
  }, [date]);

  async function fetchMeteoData(url) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`Error fetching data from ${url}`);
      }
      const data = await resp.json();
      const meteoArray = Object.values(data);

      const MeteoGEOJSON = {
        type: "FeatureCollection",
        features: meteoArray.map((item) => ({
          type: "Feature",
          properties: {
            Standortname: item.Standortname,
            Datum: item.Datum,
            Temperatur_max: item.T_max_h1,
            Regendauer: item.RainDur,
            Luftdruck: item.p,
            lat: item.WGS84_lat,
            lon: item.WGS84_lng,
          },
          geometry: {
            type: "Point",
            coordinates: [item.WGS84_lng, item.WGS84_lat],
          },
        })),
      };

      setMeteoJSON(MeteoGEOJSON);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ backgroundColor: "#d5d9e9" }}>
      <CssBaseline />
      <MapContainer
        style={{ height: "85vh" }}
        center={[0, 0]}
        zoom={12}
        minZoom={12}
        maxBounds={OUTER_BOUNDS}
        maxBoundsViscosity={1}
      >
        <LayersControl position="topright">
          {BASE_LAYERS.map((baseLayer) => (
            <LayersControl.BaseLayer
              key={baseLayer.url}
              checked={baseLayer.checked}
              name={baseLayer.name}
            >
              <TileLayer
                attribution={baseLayer.attribution}
                url={baseLayer.url}
              />
            </LayersControl.BaseLayer>
          ))}

          <LayersControl.Overlay checked name="Meteodaten">
            <GeoJSON
              data={meteoJSON}
              pointToLayer={pointToLayer}
              key={JSON.stringify(meteoJSON)}
              onEachFeature={onEachFeature}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
}

export default Map;
