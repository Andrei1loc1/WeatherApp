
function CurrentWeather ({weatherData}){
    if (!weatherData || !weatherData.current) {
        return <div>Loading weather data...</div>; // Afișează un mesaj de încărcare
    }

    return (
            <div className="current-weather">
                <div className="current-temp">{weatherData.current.temp_c}°</div>
                <div className="weather-text">{weatherData.current.condition.text}</div>
                <img
                    src={weatherData.current.condition.icon}
                    alt={weatherData.current.condition.text}
                />
            </div>
        );
        {/*
        <div className="hourly-forecast">
            <div className="hourly-item">
                <div className="hourly-time">16:00</div>
                <div className="hourly-temp">+25</div>
            </div>
            <div className="hourly-item">
                <div className="hourly-time">20:00</div>
                <div className="hourly-temp">+22</div>
            </div>
            <div className="hourly-item">
                <div className="hourly-time">00:00</div>
                <div className="hourly-temp">+16</div>
            </div>
        </div>*/}
}

export default CurrentWeather