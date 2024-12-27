from fastapi import FastAPI
from pyproj import transform
import pandas

app = FastAPI()

@app.get("/api/base")
async def base():
    return {"Status": "Alles OK, die API funktioniert"}

# Beispiel API:
# @app.get("/api/wgs84lv95")
# async def wgs84lv95(easting:float, northing:float):
#     nEasting, nNorthing = transform(4326, 2056, easting, northing)
#     return {
#         "Koordinatensystem" : "LV95",
#         "easting" : nEasting,
#         "northing" : nNorthing
#     }