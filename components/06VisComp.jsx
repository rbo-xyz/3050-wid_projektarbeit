import React, { useState, useEffect } from "react";
import { VegaLite } from "react-vega";

export const VisComp = ({ date, data, stao }) => {
  const [vegaSpec, setVegaSpec] = useState();

  //
  // Fetch
  useEffect(() => {
    const url = `api/vis?data=${data}&time=${date}&stao=${stao}`;
    fetchVegaData(url);
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
      <VegaLite spec={vegaSpec} />
    </div>
  );
};
