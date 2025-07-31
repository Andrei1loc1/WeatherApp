import {useState, useEffect} from "react";
import {getWeatherForecast} from "../api/weatherApi";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import DailyForecast from "./DailyForecast";
import Search from "./Search";

function Weather({ onWeatherDataChange, detectedCity }){
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState("Timisoara");
    const [animation, setAnimation] = useState(false);


    const fetchWeather = async (city) => {
        try {
            const forecast = await getWeatherForecast(city, 4);
            setWeatherData(forecast);
            onWeatherDataChange(forecast); // Transmit datele către componenta părinte
            setError(null);
            setAnimation(true);
            setTimeout(() => setAnimation(false), 800); // dezactivam animatia dupa 0.8s
        } catch (err) {
            setError("Nu s-au putut obtine datele meteo!");
            setWeatherData(null);
            onWeatherDataChange(null);
        }
    };
    useEffect(() => {
        fetchWeather(city);
    }, [city]);

    // Efect pentru orașul detectat
    useEffect(() => {
        if (detectedCity && detectedCity !== city) {
            setCity(detectedCity);
        }
    }, [detectedCity]);
    return (
        <>
            <div className={`weather-all ${animation ? "animate" : ""}`}>
                <Search onSearch={setCity}/>
                <h1 className="current-city">
                    {weatherData?.location?.name || city}
                </h1>
                <CurrentWeather weatherData={weatherData}/>
                <WeatherDetails weatherData={weatherData}/>
                <DailyForecast weatherData={weatherData}/>
            </div>
        </>
    )
}

export default Weather;