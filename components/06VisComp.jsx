import { useState, useEffect } from "react";
import { VegaLite } from "react-vega";

export const VisComp = ({ date, data, stao }) => {
  const [vegaSpec, setVegaSpec] = useState();

  //
  // Fetch
  useEffect(() => {
    if (date && data && stao) {
      const url = `api/vis?data=${data}&time=${date}&stao=${stao}`;
      fetchVegaData(url);
    }
  }, [date, data, stao]);

  async function fetchVegaData(url) {
    try {
      const resp = await fetch(url);
      if (!resp.ok) {
        throw new Error(`Error fetching data from ${url}`);
      }
      const spec = await resp.json();
      setVegaSpec(spec);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {vegaSpec ? <VegaLite spec={vegaSpec} /> : <p>Lade das Diagramm...</p>}
    </div>
  );
};
