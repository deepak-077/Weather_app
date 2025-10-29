"use client";

import axios from "axios";
import { useState, useEffect } from "react";

function Card1({ search, setSearch, setWeatherData, setCity }) {

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debouncing
  useEffect(() => {
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  async function fetchSuggestions(query) {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=5&language=en&format=json`
      );
      const data = response.data.results || [];
      setSuggestions(data.slice(0, 5)); 
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  async function selectCity(cityData) {
    const { name, country, latitude, longitude } = cityData;
    setCity({ name, country });
    setSearch(name);
    setSuggestions([]); 

    try {
      const response = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,weathercode,windspeed_10m,snowfall,cloudcover&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  return (
    <div className="flex justify-center items-center px-[40px] sm:px-[100px] text-white flex-col gap-[50px] md:mt-[50px] mt-[20px]  relative">
      <div className="text-4xl font-bold text-center">
        How's the sky looking today?
      </div>

      <div className="flex flex-col md:flex-row items-center text-white p-1.5 rounded-lg gap-3 w-full max-w-[450px] relative">
        <div className="flex relative w-full max-w-[350px]">
          <img
            className="size-5 absolute ml-3 mt-2.5"
            src="search.svg"
            alt=""
          />
          <input
            className="w-full max-w-[350px] min-w-[150px] rounded-lg p-2 pl-9 bg-[#3a3550] focus:outline-none focus:ring-2 focus:ring-white hover:cursor-pointer"
            type="text"
            placeholder="Search for a place..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Suggestions dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-[110%] left-0 w-full bg-[#3a3550] rounded-md shadow-lg z-10">
              {suggestions.map((city, index) => (
                <div
                  key={index}
                  onClick={() => selectCity(city)}
                  className="px-4 py-2 hover:bg-blue-700 cursor-pointer"
                >
                  {city.name}, {city.country}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="max-w-[150px] md:max-w-[80px] w-full bg-blue-600 p-2 font-extrabold md:font-semibold rounded-lg hover:cursor-pointer"
          onClick={() => selectCity(suggestions[0])}
          disabled={loading || suggestions.length === 0}
        >
          {loading ? "..." : "Search"}
        </button>
      </div>
    </div>
  );
}

export default Card1;
