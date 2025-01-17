# Projektarbeit WID

## Getting Started

1. Repository klonen:

   ```
   git clone
   ```

   Alternativ kann auch mithilfe des Github-Desktop das Repository geklont werden

2. Installation der benötigten Software:

- Microsoft Visuel Studio Code
- Anaconda Distribution
- Node.js

### Setting Up Anaconda-Enviroment

1. Erstellung eines Anaconda-Enviorment

   ```
   conda create -n 3050WID_project_py312 python=3.12 -c conda-forge
   ```

2. Installation der benötigten Module:

   ```
   pip install [module]
   ```

   Die Benötigten Module sind in requirements.txt gespeichert

3. Projektordner im VS-Code öffnen.

4. `index.py` öffnen im Ordner `api`

5. Im Suchfenster oben `> Python: Select Interpretter` eigeben und die Funktion auswählen.

6. Erstelltes Python-Enviroment auswählen (gemäss unterem Screenshot)

   ![](/public/01_pythonInterpreter.png)

### Starten der Applikation

1. Projektordner im VS-Code öffnen und Terminal öffnen

2. `node.js`-Module installieren:

   ```
   npm install
   ```

3. Webserver starten

   ```
   npm run dev
   ```

4. Öfnnen der Appliaktion

   Die API sollte mit dem forntend Automatisch starten.

   <http://localhost:3000/>

## Webseite

Die Appliaktion ist als Projektarbeit für das Modul 3050 WID für den BSc in Geomatik erstellt wurde. Die dazugehörigen Reflexionsfragen sind auf Moodle abgeben worden.

Nachfolgen sind Bilder der Appliaktion beigelegt.

### Titelseite

![](/public/02_titelseite.png)

### Kartendarstellung

![](/public/03_karte.png)

### Visualisierung

![](/public/04a_Vis.png)

![](/public/04b_Vis.png)

### Vorhersage

![](/public/05_Pre.png)
