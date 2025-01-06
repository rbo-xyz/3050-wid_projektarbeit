# Projektarbeit WID

## Getting Started

1. Repository klonen:

   ```
   git clone
   ```

   Alternativ kann auch mithilfe des Github-Desktop das Repository geklont werden

2. benötigte Programme:

   - node.js
   - anaconda
   - VSCode

### Frontend-Server

1. `node.js`-Module installieren:

   ```
   npm install
   ```

2. Webserver starten

   ```
   npm run dev
   ```

3. Auf den angezeigten localhost-Link klicken und die Webseite öffnen

### API (falls die API nicht mit dem Forntend automatisch gestartet wird)

1. Erstellung eines Anaconda-Enviorment

   ```
   conda create -n 3050WID_project_py312 python=3.12 -c conda-forge
   ```

2. Installation der benötigten Module:

   ```
   pip install [module]
   ```

   Die Benötigten Module sind in requirements.txt gespeichert

3. API-Server starten:

   In der anaconda-Promt mit `cd <pfad>/api` in den Ordner der API navigieren `(./api)`

   Anschliesen erstelltes Enviorment aktivieren

   ```
   conda activate 3050WID_project_py312
   ```

   Server starten

   ```
   fastapi dev index.py
   ```
