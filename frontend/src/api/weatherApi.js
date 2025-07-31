import axios from 'axios';

const API_KEY = "f8859c9225c949a48aa175950253103";
const BASE_URL = "https://api.weatherapi.com/v1";

export const getWeatherForecast = async(city, days = 4) =>{
    try{
        const response = await axios.get(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`
        );
        return response.data;
    } catch (error){
        console.error("Error fetching current weather data:", error);
        throw error;
    }
};
