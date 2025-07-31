
function WeatherDetails({weatherData}){
    console.log(weatherData);
    if (!weatherData || !weatherData.current) {
        return <div>Loading weather data...</div>; // Afișează un mesaj de încărcare
    }

    return <div className="weather-details">
        <div className="detail-item">
            <div className="detail-label">Wind Speed(km/h)</div>
            <div className="detail-value">
                {weatherData.current.wind_kph}
            </div>
        </div>
        <div className="detail-item">
            <div className="detail-label">Humidity</div>
            <div className="detail-value">{weatherData.current.humidity}%</div>
        </div>
    </div>
}

export default WeatherDetails