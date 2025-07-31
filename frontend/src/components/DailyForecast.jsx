function DailyForecast({weatherData}){
    if (!weatherData || !weatherData.forecast || !weatherData.forecast.forecastday) {
        return <div>Loading weather data...</div>; // Afișează un mesaj de încărcare
    }
    const forecastDays = weatherData.forecast.forecastday.slice(0,4);
    return <div className="daily-forecast">
        {forecastDays.map((day, index) => (
        <div className="day-item" key={index}>
            <div className="day-name">
                {new Date(day.date).toLocaleDateString("en-US", {weekday: "long"})}
            </div>
            <div className="day-high">☀️{day.day.maxtemp_c}°C</div>
            <div className="day-low">🌙{day.day.mintemp_c}°C</div>
        </div>
        ))}
    </div>
}

export default DailyForecast