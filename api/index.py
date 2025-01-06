from fastapi import FastAPI
import altair as alt

import os
import json
from datetime import datetime, timezone
import math

alt.data_transformers.enable("vegafusion")


app = FastAPI()

# --------------------------------------------------------------------------------------------------------- #
# IMPORT aller JSON-DATEN in ein Pandas Dataframe (all PANDAS DF)

# base_path = os.path.join(os.path.dirname(__file__), "data")
# anzahl_daten = 4
# all_df = []
# list_df =[]

# for jahr in range(anzahl_daten):
#     year = 2021 + jahr
#     file_name = f"new_meteodaten_daily_{year}.json"
#     file_path = os.path.join(base_path, file_name)

#     df = pd.read_json(file_path)

#     df_name = f"df_{year}"
#     globals()[df_name] = df

#     all_df.append(df)
#     list_df.append((df_name, df.shape))

# df_all = pd.concat(all_df, ignore_index=True)

# --------------------------------------------------------------------------------------------------------- #
# IMPORT aller JSON-DATEN (alternative)

base_path = os.path.join(os.path.dirname(__file__), "data")
anzahl_daten = 4
first_jahr = 2021
all_data = []

for jahr in range(anzahl_daten):
    year = first_jahr + jahr
    file_name = f"new_meteodaten_daily_{year}.json"
    file_path = os.path.join(base_path, file_name)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
        all_data.extend(data)

# --------------------------------------------------------------------------------------------------------- #
# Basis für Testzwecke
@app.get("/api/base")
async def base():
    return {"Status": "Alles OK, die API funktioniert"}

# --------------------------------------------------------------------------------------------------------- #
# Datumsabfrage mit Pandas DF

# @app.get("/api/date")
# async def date(time_str:str):
#     try:
#         time = pd.Timestamp(time_str, tz="Europe/London")
#         time_unix_ms = int(time.timestamp()*1000)
#         filter_df = df_all[df_all["Datum"] == time_unix_ms]
#         filter_df = filter_df.fillna("keine Daten")

#         if filter_df.empty:
#             return {"Status" : "Keine Daten Vorhanden"}
        
#         result_df = filter_df.to_dict(orient="index")
#         return result_df     

#     except Exception as e:
#         return {"Status Fehler": str(e)}

# Datumsabfrage mit json 
@app.get("/api/date")
async def date(time_str: str):
    try:
        time = datetime.fromisoformat(time_str).replace(tzinfo=timezone.utc)
        time_unix_ms = int(time.timestamp() * 1000)

        filtered_data = [entry for entry in all_data if entry.get("Datum") == time_unix_ms]

        if not filtered_data:
            return {"Status": "Keine Daten vorhanden"}

        return filtered_data

    except Exception as e:
        return {"Status Fehler": str(e)}

# Beispielabfrage: http://localhost:8000/api/date?time_str=2024-01-01

# --------------------------------------------------------------------------------------------------------- #
# API für Heatmap-Spezifikationen
@app.get("/api/vis")
async def vis(data: str, time: int, stao: str):
    try:

        filtered_data = [d for d in all_data if d["Standort"] == stao and int(datetime.fromtimestamp( d["Datum"]/ 1000).year) == time]

        if len(filtered_data) == 0:
            return {"Status": "Keine Daten vorhanden"}

        for d in filtered_data:
            date_obj = datetime.fromtimestamp(d["Datum"] / 1000)
            d["Tag"] = date_obj.day
            d["Monat"] = date_obj.strftime('%b')

        stao_komp = []
        for d in filtered_data:
            stao_komp.append(d["Standortname"])

        stao_einz = stao_komp[0]

        color_scale = (
            alt.Scale(domain=[-20, -10, 0, 10, 20, 30, 40], range=["blue", "lightblue", "white", "pink", "lightred", "red", "darkred"])
            if data == "T_max_h1"
            else alt.Scale(domain=[0, 100, 200, 300, 400, 500], range=["white", "lightblue", "blue", "darkblue", "navy", "black"])
        )

        month_order = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez"]

        chart = (
            alt.Chart(alt.Data(values=filtered_data))
            .mark_rect()
            .encode(
                x=alt.X("Tag:O", title="Tag"),
                y=alt.Y("Monat:O", title="Monat", sort=month_order),
                color=alt.Color(f"{data}:Q", scale=color_scale, title="Wert"),
                tooltip=["Datum:T", f"{data}:Q"],
            )
            .properties(
                title=f"Tägliche {'Temperaturen' if data == 'T' else 'Regenmengen'} in {stao_einz} ({time})",
                width=600,
                height=300,
            )
        )
        
        return chart.to_dict(format="vega")

    except Exception as e:
        return {"Status Fehler": str(e)}

# Beispielabfrage: http://localhost:8000/api/vis?data=T&time=2021&stao=Zch_Stampfenbachstrasse

# --------------------------------------------------------------------------------------------------------- #
# API für Prediction
@app.get("/api/pre")
async def pre(time_str:str):
    try:

        time1 = datetime.fromisoformat(time_str).replace(tzinfo=timezone.utc)
        time_unix_ms = int(time1.timestamp() * 1000)

        start = 1609459200000
        time4 = (time_unix_ms - start) / 1000
        time5 = int((time4 / (60 * 60 * 24))+1)

        temp_pre = 0.0001 * time5 + 10.56 * math.sin(0.017453 * time5 + (-2.44)) + 15.56

        date = datetime.utcfromtimestamp( time_unix_ms/ 1000).strftime("%Y-%m-%d")

        return {"Tag (Tageszahl ab Start)": time5,
                "Datum" : date,
                "Vorhergesagte Temperatur (°C)": round(temp_pre, 2)}

    except Exception as e:
        return {"Status Fehler": str(e)}

# Beispielabfrage: http://localhost:8000/api/pre?time_str=2024-01-01