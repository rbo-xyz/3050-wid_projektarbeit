from fastapi import FastAPI
from pyproj import transform

app = FastAPI()

@app.get("/api/base")
async def base():
    return {"status": "alles gut, es funktioniert Version 2"}

@app.get("/api/wgs84lv95")
async def wgs84lv95(easting:float, northing:float):
    nEasting, nNorthing = transform(4326, 2056, easting, northing)
    return {
        "Koordinatensystem" : "LV95",
        "easting" : nEasting,
        "northing" : nNorthing
    }

## Abfrage: ?easting=47.514920&northing=7.657665
# Soll Resultat: 2616499.69, 1262709.11

@app.get("/api/lv95wgs84")
async def lv95wgs84(easting:float, northing:float):
    nEasting, nNorthing = transform(2056, 4326, easting, northing)
    return {
        "Koordinatensystem" : "WGS84",
        "easting" : nEasting,
        "northing" : nNorthing
    }

## Abfrage: ?easting=2616499.69&northing=1262709.11
# Soll Resultat: 47.514920, 7.657665