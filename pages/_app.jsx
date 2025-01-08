import "./App.css";
import "leaflet/dist/leaflet.css";

import { useRef, useState } from "react";
import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import dayjs from "dayjs";

import { Header } from "../components/01Header";
import { ToTheTop } from "../components/02ToTheTop";
import { ButtonComp } from "../components/03ButtonComp";
import { DatePickerComp } from "../components/04DatePickerComp";
import { DropdownComp } from "../components/05DropdownComp";
import { VisComp } from "../components/06VisComp";
import { PreComp } from "../components/07PreComp";
const Map = dynamic(() => import("../components/10Map/10Map"), { ssr: false });

export default function App() {
  //
  // Funtionen und Referenzen für den Window-Scroll
  const targetDiv2 = useRef(null);
  const targetDiv3 = useRef(null);
  const targetDiv4 = useRef(null);

  const scrollDiv2 = () => {
    targetDiv2.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollDiv3 = () => {
    targetDiv3.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollDiv4 = () => {
    targetDiv4.current?.scrollIntoView({ behavior: "smooth" });
  };

  //
  // useStates DatumPicker Map
  const [dateMap, setDateMap] = useState("2015-01-01");
  const dateRangeMapMin = dayjs("2015-01-01");
  const dateRangeMapMax = dayjs("2024-12-31");

  //
  // Für Visualisierung
  const dateList = [
    { 2015: "2015" },
    { 2016: "2016" },
    { 2017: "2017" },
    { 2018: "2018" },
    { 2019: "2019" },
    { 2020: "2020" },
    { 2021: "2021" },
    { 2022: "2022" },
    { 2023: "2023" },
    { 2024: "2024" },
  ];

  const dataList = [{ RainDur: "Regendauer" }, { T_max_h1: "Temperatur" }];

  const StaoList = [
    { Zch_Stampfenbachstrasse: "Zürich Stampfenbachstrasse" },
    { Zch_Schimmelstrasse: "Zürich Schimmelstrasse" },
    { Zch_Rosengartenstrasse: "Zürich Rosengartenstrasse" },
  ];

  const [selectedDate, setSelectedDate] = useState();
  const [selectedData, setSelectedData] = useState();
  const [selectedStao, setSelectedStao] = useState();

  const selectedDateFunction = (event) => {
    setSelectedDate(event.target.value);
  };

  const selectedDataFunction = (event) => {
    setSelectedData(event.target.value);
  };

  const selectedStaoFuntion = (event) => {
    setSelectedStao(event.target.value);
  };

  //
  // useStates DatumPicker Prediciton
  const [datePre, setDatePre] = useState("2025-01-01");
  const dateRangePreMin = dayjs("2025-01-01");
  const dateRangePreMax = dayjs("2030-12-31");

  return (
    <div className="App">
      <Header />
      <ToTheTop />
      <div className="divContainer">
        <div className="divFullscreen div1">
          <div>
            <Typography variant="h4">Herzlich Willkommen</Typography>
            <Typography variant="h6">auf der Meteo WebApp</Typography>
            <br />
            <Typography variant="body1">
              Im Rahmen der Abschluss-Projektarbeit im Modul 3050
              Webprogrammierung und Datenvisualisierung <br />
              für den BSc Geomatik FHNW wurde diese WebApp erstellt. <br />
              <br />
              Mithilfe der Buttons kann mit den Daten unterschiedlich
              interagiert werden. <br />
              Viel Spass!
            </Typography>
          </div>
          <div id="buttonContainer">
            <ButtonComp
              knopfdruck={() => scrollDiv2()}
              beschriftung={"Karte"}
            />
            <ButtonComp
              knopfdruck={() => scrollDiv3()}
              beschriftung={"Visualisierung"}
            />
            <ButtonComp
              knopfdruck={() => scrollDiv4()}
              beschriftung={"Vorhersage"}
            />
          </div>
        </div>
        <div ref={targetDiv2} className="divFullscreen div2">
          <div className="mapPickerContainer">
            <div id="mapTextSubcontainer">
              <Typography variant="h6">Meteo-Karte</Typography>
              <Typography variant="body1">
                Mithilfe der Wahl eines Datums rechts können auf der Karte unten
                die Daten von diesem Tag eingesehen werden.
              </Typography>
            </div>
            <div id="mapPickerSubcontainer">
              <DatePickerComp
                date={dateMap}
                onDateChange={setDateMap}
                minRange={dateRangeMapMin}
                maxRange={dateRangeMapMax}
              />
            </div>
          </div>
          <Map date={dateMap} />
        </div>
        <div ref={targetDiv3} className="divFullscreen div3">
          <div className="VisTitelContainer">
            <div id="VisTitelSubcontainer">
              <Typography variant="h6">Meteo-Diagramm</Typography>
              <Typography variant="body1">
                Mithilfe der Wahl der einzelnen Komponenten rechts kann unten
                ein Diagramm generiert werden, welche die Daten visualisiert.
              </Typography>
            </div>
            <div id="VisDropdownSubcontainer">
              <DropdownComp
                label="Datum"
                list={dateList}
                selectedItemFunction={selectedDateFunction}
              />
              <DropdownComp
                label="Darstellungsdaten"
                list={dataList}
                selectedItemFunction={selectedDataFunction}
              />
              <DropdownComp
                label="Standort"
                list={StaoList}
                selectedItemFunction={selectedStaoFuntion}
              />
            </div>
          </div>
          <div className="VisContainer">
            <VisComp
              date={selectedDate}
              data={selectedData}
              stao={selectedStao}
            />
          </div>
        </div>
        <div ref={targetDiv4} className="divFullscreen div4">
          <div className="PreTitelContainer">
            <div id="PreTitelSubcontainer">
              {" "}
              <Typography variant="h6">Temperatur-Vorhersage</Typography>
              <Typography variant="body1">
                Mithilfe der Wahl eines Datums rechts wird unten eine Vorhersage
                für eine mögliche Höchsttemperatur an diesem Tag gemacht
              </Typography>
            </div>
            <div id="PreSelectorSubcontainer">
              <DatePickerComp
                date={datePre}
                onDateChange={setDatePre}
                minRange={dateRangePreMin}
                maxRange={dateRangePreMax}
              />
            </div>
          </div>
          <div className="PreContainer">
            <PreComp time={datePre} />
          </div>
        </div>
      </div>
    </div>
  );
}
