from fastapi import FastAPI
import pandas as pd
import os

app = FastAPI()

app = FastAPI()

# --------------------------------------------------------------------------------------------------------- #
# IMPORT aller JSON-DATEN in ein Pandas Dataframe
base_path = os.path.join(os.path.dirname(__file__), "data")
anzahl_daten = 4
all_df = []
list_df =[]

for jahr in range(anzahl_daten):
    year = 2021 + jahr
    file_name = f"new_meteodaten_daily_{year}.json"
    file_path = os.path.join(base_path, file_name)

    df = pd.read_json(file_path)

    df_name = f"df_{year}"
    globals()[df_name] = df

    all_df.append(df)
    list_df.append((df_name, df.shape))

df_all = pd.concat(all_df, ignore_index=True)

# --------------------------------------------------------------------------------------------------------- #
# Basis für Testzwecke
@app.get("/api/base")
async def base():
    return {"Status": "Alles OK, die API funktioniert"}

# --------------------------------------------------------------------------------------------------------- #
# Datumsabfrage
@app.get("/api/date")
async def date(time_str:str):
    try:
        time = pd.Timestamp(time_str, tz="Europe/London")
        time_unix_ms = int(time.timestamp()*1000)
        filter_df = df_all[df_all["Datum"] == time_unix_ms]
        filter_df = filter_df.fillna("keine Daten")

        if filter_df.empty:
            return {"Status" : "Keine Daten Vorhanden"}
        
        result_df = filter_df.to_dict(orient="index")
        return result_df     

    except Exception as e:
        return {"Status Fehler": str(e)}

# Beispielabfrage: http://localhost:8000/api/date?time_str=2024-01-01
# --------------------------------------------------------------------------------------------------------- #

# Beispiel API:
# @app.get("/api/wgs84lv95")
# async def wgs84lv95(easting:float, northing:float):
#     nEasting, nNorthing = transform(4326, 2056, easting, northing)
#     return {
#         "Koordinatensystem" : "LV95",
#         "easting" : nEasting,
#         "northing" : nNorthing
#     }