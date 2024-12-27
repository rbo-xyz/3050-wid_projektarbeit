// Quelle vom Stack-Element: https://mui.com/material-ui/react-stack/, angepasst auf dei hier Vorliegenden Bedürfnisse

import "./App.css";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { useState } from "react";

import { Input } from "../components/Input";
import { Dropdown } from "../components/Dropdown";
import { ButtonProg } from "../components/ButtonProg";

export default function App() {
  //
  // Definiton der Fixen Variabeln (Definition der Liste)
  const transformatoren_new = [
    { wgs84tolv95: "WGS84 zu LV95" },
    { lv95towgs84: "LV95 zu WGS84" },
    { wgs84tolv03: "WGS84 zu LV03" },
    { lv03towgs84: "LV03 zu WGS84" },
    { lv95tolv03: "LV95 zu LV03" },
    { lv03tolv95: "LV03 zu LV95" },
  ];

  const baseLink = "http://geodesy.geo.admin.ch/reframe/";

  //
  // UseState-Hook Dropdown
  const [selectedTransformator, setSelectedTransformator] = useState("");

  //
  // UseState-Hook der Inputs
  const [inputOstwert, setInputOstwert] = useState(" ");
  const [inputNordwert, setInputNordwert] = useState(" ");

  //
  // UseState-Hook der Transformation
  const [transformiertOstwert, setTransformiertOstwert] = useState("");
  const [transformiertNordwert, setTransformiertNordwert] = useState("");

  //
  // Dropdown Select Function
  const selectedTransformatorFunction = (event) => {
    setSelectedTransformator(event.target.value);
  };

  //
  // Speicherung der Ursprungskooridnaten
  const inputOstwertFunc = (event) => {
    setInputOstwert(event.target.value);
  };

  const inputNordwertFunc = (event) => {
    setInputNordwert(event.target.value);
  };

  //
  // Check ob Button abgeschaltet sein muss
  const abschaltung = !inputOstwert.trim() || !inputNordwert.trim();

  //
  // Erstellung des Trandformationslinks
  const transformBaseLink = baseLink + selectedTransformator;
  const transformString =
    "?easting=" + inputOstwert + "&northing=" + inputNordwert + "&format=json";
  const transformLink = transformBaseLink + transformString;

  //
  // Transformation
  async function fetchCoords() {
    setTransformiertOstwert("");
    setTransformiertNordwert("");
    const resp = await fetch(transformLink);
    console.log(resp);

    if (resp.status == 200) {
      const data = await resp.json();

      setTransformiertOstwert(data.easting);
      setTransformiertNordwert(data.northing);
    } else {
      alert(
        "Die Eingabe ist nicht korrekt.\nEine Transformation ist nicht Möglich"
      );
    }
  }

  return (
    <div className="App">
      <Stack spacing={1}>
        <Typography variant="h3">Koordinatentransformation</Typography>
        <Typography variant="h6">
          Berechnung mit swisstopos REFRAME-Dienst
        </Typography>
        <Stack direction="row" spacing={2} justifyContent={"center"}>
          <Dropdown
            list={transformatoren_new}
            selectedItemFunction={selectedTransformatorFunction}
          />
          <span style={{ width: 250 }}></span>
        </Stack>
        <Stack direction="row" spacing={0} justifyContent={"center"}>
          <Input
            inputLable={"Ostwert"}
            schreibrecht={!selectedTransformator}
            inputFunction={inputOstwertFunc}
          />
          <Input
            inputLable={"Nordwert"}
            schreibrecht={!selectedTransformator}
            inputFunction={inputNordwertFunc}
          />
        </Stack>
        <ButtonProg
          abschaltung={abschaltung}
          knopfdruck={() => fetchCoords()}
        />
        <Stack direction="row" spacing={0} justifyContent={"center"}>
          <Input
            inputLable={"Transformierter Ostwert"}
            schreibrecht={true}
            inputValue={transformiertOstwert}
          />
          <Input
            inputLable={"Transformierter Nordwert"}
            schreibrecht={true}
            inputValue={transformiertNordwert}
          />
        </Stack>
      </Stack>
    </div>
  );
}
