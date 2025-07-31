import { useState } from 'react'
import Weather from './components/Weather'
import Map from './components/Map'
import WeatherExtra from './components/WeatherExtra'
import LoadingScreen from './components/LoadingScreen'
import InstallPrompt from './components/InstallPrompt'
import LocationPermission from './components/LocationPermission'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [detectedCity, setDetectedCity] = useState(null);

  const handleWeatherDataChange = (data) => {
    setWeatherData(data);
    if (data) {
      setIsLoading(false);
    }
  };

  const handleLocationDetected = (city) => {
    setDetectedCity(city);
  };

  return (
    <>
      {isLoading && <LoadingScreen />}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '2rem',
        padding: '2rem',
        minHeight: '100vh',
        flexWrap: 'wrap',
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out'
      }}>
        <Weather onWeatherDataChange={handleWeatherDataChange} detectedCity={detectedCity} />
        {weatherData && <WeatherExtra weatherData={weatherData} />}
        {weatherData && <Map weatherData={weatherData} />}
      </div>
      <InstallPrompt />
      <LocationPermission onLocationDetected={handleLocationDetected} />
    </>
  )
}

export default App
