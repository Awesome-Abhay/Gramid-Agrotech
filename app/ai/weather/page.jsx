"use client"
import React, { useState } from 'react';

const WeatherPrediction = () => {
  const [region, setRegion] = useState('');
  const [days, setDays] = useState('');
  const [weatherOutput, setWeatherOutput] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  async function getWeather() {
    const daysInt = parseInt(days, 10);

    if (!region || isNaN(daysInt) || daysInt <= 0) {
      alert("Please enter a valid city name and number of days!");
      return;
    }

    // Set a loading message
    setWeatherOutput(
      <p className="text-gray-700">Fetching weather data...</p>
    );

    let forecastElements = [
      <p key="city" className="text-lg text-gray-700">
        <strong>City:</strong> {region}
      </p>
    ];
    let remainingDays = daysInt;
    let startDateIndex = 0;

    try {
      while (remainingDays > 0) {
        const fetchDays = Math.min(remainingDays, 3);
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=bfbd2bd196a242278cc143734252001&q=${region}&days=${fetchDays}`
        );
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }

        // Append forecast days while skipping days already added.
        data.forecast.forecastday.forEach((day, index) => {
          if (index >= startDateIndex) {
            forecastElements.push(
              <div
                key={day.date}
                className="flex items-center justify-between bg-gray-100 p-2 mt-2 rounded-lg"
              >
                <div>
                  <p className="text-gray-600">{day.date}</p>
                  <p className="text-gray-700">
                    <strong>{day.day.condition.text}</strong>
                  </p>
                  <p className="text-gray-700">
                    <strong>Temp:</strong> {day.day.avgtemp_c}°C
                  </p>
                </div>
                <img
                  src={day.day.condition.icon}
                  alt="Weather Icon"
                  className="w-12 h-12"
                />
              </div>
            );
          }
        });

        remainingDays -= fetchDays;
        startDateIndex += fetchDays;
      }

      setWeatherOutput(forecastElements);
      setModalVisible(true);
    } catch (error) {
      setWeatherOutput(
        <p className="text-red-500">
          Error fetching data: {error.message}
        </p>
      );
      console.error(error);
      setModalVisible(true);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-[url('/images/weather.jpg')]">
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6 w-96 text-center">
        <h1 className="text-3xl font-bold text-gray-700">Weather Prediction</h1>

        <label htmlFor="region" className="block mt-4 text-gray-600">
          Enter City Name:
        </label>
        <input
          type="text"
          id="region"
          placeholder="e.g., Delhi"
          className="w-full p-2 border rounded-md mt-1"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />

        <label htmlFor="days" className="block mt-4 text-gray-600">
          Number of Days:
        </label>
        <input
          type="number"
          id="days"
          placeholder="e.g., 3"
          className="w-full p-2 border rounded-md mt-1"
          value={days}
          onChange={(e) => setDays(e.target.value)}
        />

        <button
          id="checkWeather"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow-lg transition"
          onClick={getWeather}
        >
          Check Weather
        </button>
      </div>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] relative overflow-hidden">
            <button
              id="closeModal"
              className="absolute top-2 right-3 text-gray-500 text-xl"
              onClick={() => setModalVisible(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-gray-700">
              Weather Forecast
            </h2>
            <div
              id="weatherContainer"
              className="mt-4 max-h-[60vh] overflow-y-auto px-2"
            >
              {weatherOutput}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherPrediction;
