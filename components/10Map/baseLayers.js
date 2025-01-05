export const BASE_LAYERS = [
  {
    name: "Landeskarte",
    attribution: "Bundesamt für Landestopografie swisstopo ",
    url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/current/3857/{z}/{x}/{y}.jpeg",
    checked: true,
    minZoom: 12,
    maxZoom: 20,
  },
  {
    name: "Swissimage",
    attribution: "Bundesamt für Landestopografie swisstopo ",
    url: "https://wmts.geo.admin.ch/1.0.0/ch.swisstopo.swissimage/default/current/3857/{z}/{x}/{y}.jpeg",
    minZoom: 12,
    maxZoom: 20,
  },
];
