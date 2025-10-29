"use client"

import Header from "./Components/Header";
import Card1 from "./Components/Card1";
import Card2 from "./Components/Card2";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [weatherData,setWeatherData]=useState(null)
  const [search,setSearch]= useState("") 
  const [city,setCity]=useState(null)

  useEffect(() => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // 1️⃣ Reverse geocode to get city name
        const geoResponse = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
        );
        const cityData = geoResponse.data.results?.[0];
        if (cityData) {
          setCity({ name: cityData.name, country: cityData.country });
        } else {
          setCity({ name: "Unknown", country: "" });
        }
      } catch (error) {
        console.error("Error fetching city name", error);
        setCity({ name: "Unknown", country: "" });
      }

      try {
        // 2️⃣ Fetch weather data
        const weatherResponse = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,weathercode,windspeed_10m,snowfall,cloudcover&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );
        setWeatherData(weatherResponse.data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    },
    (error) => {
      console.error("Geolocation permission denied or error", error);
      // Optionally, fallback to a default city
      setCity({ name: "New York", country: "US" });
      // You could also fetch weather for default coordinates
    }
  );
}, []);

  

  return (
    <div className="flex flex-col  gap-6 bg-blue-950 h-full">
      <Header/>

      <div className="flex flex-col items-center mt-6">
        <Card1 search={search} setSearch={setSearch} setWeatherData={setWeatherData} setCity={setCity}/>
        <Card2 weatherData={weatherData} city={city}/>
      </div>
      
    </div>
  );
}
