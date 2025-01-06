import { useState, useEffect } from "react";

export const PreComp = ({ time }) => {
  const [preJSON, setPreJSON] = useState();

  //
  // Fetch
  useEffect(() => {
    const url = `api/pre?time_str=${time}`;
    fetchPreData(url);
  }, [time]);

  async function fetchPreData(url) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`Error fetching data from ${url}`);
      }
      const spec = await resp.json();
      setPreJSON(spec);
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div>
      {preJSON ? (
        <div>
          <p>
            <strong>Datum:</strong> {formatDate(preJSON.Datum)}
          </p>
          <p>
            <strong>Vorhergesagte Temperatur (°C):</strong>{" "}
            {preJSON["Vorhergesagte Temperatur (°C)"]} °C
          </p>
        </div>
      ) : (
        <p>Lade Daten...</p>
      )}
    </div>
  );
};
