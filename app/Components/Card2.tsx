"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { useState } from "react";
import weatherIcon from "./weatherIcon";

function Card2({ weatherData, city }:any) {
  const { current_weather, hourly, daily } = weatherData || {};
  
  // State variables for dropdown and selected day
  const [clickedForecast, setClickedForecast] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // default = today


  // Fallback for missing data
  if (!current_weather || !hourly || !daily || !hourly.relative_humidity_2m || !hourly.precipitation) return null;

  
  // Daily dates
  const dailyDates = daily.time.map(day => new Date(day));

  // Determine start and end index of hourly data for selected day
  const now = new Date();
  const dayStart = dailyDates[selectedDayIndex];
  const dayEnd = new Date(dayStart);
  dayEnd.setHours(23, 59, 59, 999);

  let hourlyStartIndex;
  if (selectedDayIndex === 0) {
    // For today, start from current hour
    hourlyStartIndex = hourly.time.findIndex(time => new Date(time) >= now);
  } else {
    // For future days, start from midnight
    hourlyStartIndex = hourly.time.findIndex(time => new Date(time) >= dayStart);
  }

  if (hourlyStartIndex < 0) hourlyStartIndex = 0;

  // Slice next 8 hours
  const dayHourlyTemps = hourly.time
    .slice(hourlyStartIndex, hourlyStartIndex + 8)
    .map((time, i) => ({
      time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: hourly.temperature_2m[hourlyStartIndex + i],
      weathercode: hourly.weathercode ? hourly.weathercode[hourlyStartIndex + i] : current_weather.weathercode
    }));

  // Current hour 
  const currentHourIndex = hourly.time.findIndex(time => new Date(time) >= now);
  const idx = currentHourIndex >= 0 ? currentHourIndex : 0;
  const currentHumidity = hourly.relative_humidity_2m[idx] ?? "N/A";
  const currentPrecipitation = hourly.precipitation[idx] ?? "N/A";

  // Date
  const dayName = dailyDates[selectedDayIndex].toLocaleDateString("en-US", { weekday: "long" });
  const date = dailyDates[selectedDayIndex].toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const icon = weatherIcon(current_weather.weathercode);

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center">
      
      {/* left component */}
      <div className="w-full max-w-[600px] flex flex-col gap-6">

        {/* temperature card */}
        <div className="text-white bg-[url('/large.svg')] bg-cover bg-center h-[200px] rounded-2xl flex flex-col sm:flex-row justify-between items-center p-5">
          <div className="font-bold">
            <p>{city.name}, {city.country}</p>
            <p>{dayName}, {date}</p>
          </div>
          <div>
            <p className="text-5xl font-bold">{current_weather.temperature}°C</p>
          </div>
        </div>

        {/* info cards */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-5">
          
          <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white p-2">
            <p>Feels Like</p>
            <p>{current_weather.temperature}°C</p>
          
          </div>
          
          <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white p-2">
            <p>Wind</p>
            <p>{current_weather.windspeed} km/hr</p>
          </div>
          
          <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white p-2">
            <p>Humidity</p>
            <p>{currentHumidity} %</p>
          </div>
          
          <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white p-2">
            <p>Precipitation</p>
            <p>{currentPrecipitation} mm</p>
          </div>
        
        </div>

        {/* daily forecast */}
        <div className="flex flex-col gap-3 text-white">
          <h1>Daily Forecast</h1>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-1 lg:gap-3">
            {daily.time.map((day, index) => (
              
              <div key={index} className="bg-[#3a3550] w-[70px] rounded-lg h-[100px] flex flex-col justify-center items-center">
                <span className="text-sm">{new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <Image className="size-[50px]" src={icon} alt="icon" />
                
                <div className="flex justify-between w-full px-1">
                  <span className="text-xs">{daily.temperature_2m_max[index]}°</span>
                  <span className="text-xs">{daily.temperature_2m_min[index]}°</span>
                
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* right component */}
      <div className="bg-[#3a3550] w-full max-w-[300px] p-1 md:p-2 rounded-2xl">
        <div className="flex justify-around mb-3 text-md items-center text-white">
          <h1>Hourly Forecast</h1>

          {/* dropdown */}
          <div className="relative">
            
            <div className="hover:cursor-pointer" onClick={() => setClickedForecast(prev => !prev)}>
              <div className="flex justify-around shadow-lg rounded-lg p-1.5 text-md items-center">
                {dayName}
                <Image className="size-5" src="down.png" alt="down" />
              </div>
            </div>

            <div className={`absolute border border-black p-2 z-20 transition-all duration-300 ease-in-out transform ${clickedForecast ? "opacity-100 translate-y-2" : "opacity-0 -translate-y-4"}`}>
              <div className="bg-[#3a3550]">
                <ul>
                  {daily.time.map((day, index) => (
                    <li key={index}
                        className="p-1 rounded-lg hover:bg-[#4d466a] hover:cursor-pointer shadow-lg"
                        onClick={() => {
                          setSelectedDayIndex(index);
                          setClickedForecast(false);
                        }}>
                      {new Date(day).toLocaleDateString('en-US', { weekday: 'long' })}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* hourly cards */}
        <div className="flex flex-col items-center gap-2">
          {dayHourlyTemps.map((item, index) => (
            <div key={index} className="flex justify-between items-center w-[240px] p-1 rounded-lg shadow-lg text-white">
              <div className="flex items-center gap-2">
                <Image className="size-[36px]" src={weatherIcon(item.weathercode)} alt="weather icon" />
                <span>{item.time}</span>
              </div>
              <div>{item.temp}°C</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Card2;
