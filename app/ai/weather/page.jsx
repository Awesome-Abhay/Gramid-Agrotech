"use client"
import React, { useState } from "react";

const Weather = () => {
    const [city, setCity] = useState("");
    const [days, setDays] = useState(1);
    const [weatherData, setWeatherData] = useState(null);
    const [cropSuggestion, setCropSuggestion] = useState("");

    const apiKey = "6acb636fe0914d7e80e92633251801"; // Replace with your WeatherAPI key

    const fetchWeather = async () => {
        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${days}`
            );
            const data = await response.json();
            setWeatherData(data);
            suggestCrop(data.forecast.forecastday);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const suggestCrop = (forecast) => {
        let avgTemp = 0;
        let avgRainfall = 0;

        forecast.forEach((day) => {
            avgTemp += day.day.avgtemp_c;
            avgRainfall += day.day.totalprecip_mm;
        });

        avgTemp /= forecast.length;
        avgRainfall /= forecast.length;

        if (avgTemp > 25 && avgRainfall > 50) {
            setCropSuggestion("Rice or चावल");
        } else if (avgTemp > 20 && avgRainfall < 20) {
            setCropSuggestion("Wheat or गेहूं");
        } else if (avgTemp > 15 && avgRainfall < 50) {
            setCropSuggestion("Maize or मक्का");
        } else {
            setCropSuggestion("Suitable crop data not available.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Weather & Crop Suggestion</h1>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Enter city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="number"
                        min="1"
                        placeholder="Enter days"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                        onClick={fetchWeather}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Fetch Weather
                    </button>
                </div>
                {weatherData && (
                    <div className="mt-6 text-gray-700">
                        <h2 className="text-lg font-semibold">Weather in {weatherData.location.name}</h2>
                        <p>{weatherData.location.region}, {weatherData.location.country}</p>
                        <p>Current Temp: {weatherData.current.temp_c}°C</p>
                        <p>Condition: {weatherData.current.condition.text}</p>
                        <h3 className="mt-4 font-semibold">Forecast ({days} day{days > 1 ? 's' : ''}):</h3>
                        <ul className="text-sm">
                            {weatherData.forecast.forecastday.map((day) => (
                                <li key={day.date}>{day.date}: {day.day.avgtemp_c}°C, {day.day.condition.text}</li>
                            ))}
                        </ul>
                        <h3 className="mt-4 font-semibold text-green-600">Best suited crop: {cropSuggestion}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Weather;
