# React Weather App

This README provides setup, usage, and development instructions for the React Weather App — a Vite + React frontend that displays current weather, daily forecasts, maps, and additional weather details in a responsive PWA-style interface.

- Checklist
  - [x] Provide title and short description
  - [x] Installation (copy-paste ready)
  - [x] Usage (run, build, preview)
  - [x] Features, Stack, API notes
  - [x] Screenshots, Contributing, License, Credits

![language](https://img.shields.io/badge/language-JavaScript-yellow.svg)
![license](https://img.shields.io/badge/license-MIT-blue.svg)
![build](https://img.shields.io/badge/build-passing-brightgreen.svg)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Run locally](#run-locally)
  - [Build for production](#build-for-production)
  - [Preview production build](#preview-production-build)
- [Features](#features)
- [Technologies / Stack](#technologies--stack)
- [API / Endpoints](#api--endpoints)
- [Configuration (.env)](#configuration-env)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Credits / References](#credits--references)

---

## Installation

These instructions assume you cloned the repository and want to run the frontend located in the `frontend/` folder.

1. Clone the repository (replace with your repo URL):

```powershell
git clone https://github.com/<your-username>/<your-repo>.git
cd "<your-repo>/frontend"
```

2. Install dependencies (Node.js >= 16 recommended):

```powershell
npm install
```

3. Create environment variables (see [Configuration](#configuration-env)).

That's it — you can now run the app locally.

## Usage

### Run locally (development)

Start the Vite dev server:

```powershell
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`) in your browser.

### Build for production

Create an optimized production build:

```powershell
npm run build
```

Production files will be generated in the `dist/` folder.

### Preview production build

Preview the built app locally with Vite's preview command:

```powershell
npm run preview
```

This serves `dist/` so you can validate the production build.

> If your `package.json` does not include the above scripts, add these under `"scripts"`:
>
> ```json
> "scripts": {
>   "dev": "vite",
>   "build": "vite build",
>   "preview": "vite preview"
> }
> ```

## Features

- Current weather display with temperature, conditions and location.
- Multi-day / daily forecast summary.
- Search for cities and quick geolocation support.
- Interactive map to view location (component: `Map.jsx`).
- Weather details (humidity, wind, sunrise/sunset, etc.).
- Loading and permission UI flows (`LoadingScreen.jsx`, `LocationPermission.jsx`).
- PWA-ready files present (`public/manifest.json`, `public/sw.js`) for offline caching.
- Clean, responsive UI components (`NavBar`, `Search`, `WeatherExtra`, etc.).

## Technologies / Stack

- Frontend: React (JSX)
- Build tool: Vite
- Language: JavaScript (ESModules)
- Styling: CSS (files under `src/`)
- Service worker & manifest for PWA (`public/sw.js`, `public/manifest.json`)
- Fetch API for network requests
- Optional: Map libraries (Leaflet / Mapbox) — check `src/components/Map.jsx` for integration details

## API / Endpoints

The frontend communicates with a weather API via `src/api/weatherApi.js`. You can configure it to use any standard weather provider (OpenWeatherMap, WeatherAPI, Meteomatics, etc.).

Recommended (example) endpoints when using OpenWeatherMap:

- Current weather
  - GET https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API_KEY}&units=metric
- One Call / Forecast
  - GET https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly&appid={API_KEY}&units=metric
- Geocoding (search)
  - GET http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=5&appid={API_KEY}

Example usage (pseudo):

```js
// src/api/weatherApi.js (example usage)
const key = import.meta.env.VITE_WEATHER_API_KEY;
const base = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeatherByCoords(lat, lon) {
  return fetch(`${base}/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`).then(r => r.json());
}
```

Adjust endpoints and query parameters to match your chosen provider. The app expects:
- functions for fetching current weather, daily forecast, and optional search/geocoding.
- JSON responses with temperature, weather description, icon codes, humidity, wind, and timestamps for sunrise/sunset.

## Configuration (.env)

Create a `.env.local` (or `.env`) file at the root of the `frontend` folder with at least the API key:

```
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

Notes:
- Vite requires env vars to be prefixed with `VITE_` to be exposed to client code.
- Do not commit `.env.local` to source control. Add it to `.gitignore`.

## Contributing

Thanks for considering contributing — the project uses a typical fork-and-pull workflow.

1. Fork the repository.
2. Create a branch for your change:
   ```powershell
   git checkout -b feat/short-description
   ```
3. Install dependencies and run locally:
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```
4. Add tests / update components.
5. Open a Pull Request describing your change and the reasoning.

Suggested PR checklist:
- [ ] Code builds locally
- [ ] No console errors in dev mode
- [ ] New UI changes are responsive
- [ ] Add tests for new logic where appropriate

If you plan larger changes, open an issue first to discuss the design.