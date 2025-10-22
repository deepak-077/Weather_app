"use client"

import Header from "./Components/Header";
import Card1 from "./Components/Card1";
import Card2 from "./Components/Card2";
import { useState } from "react";



export default function Home() {
  const [weatherData,setWeatherData]=useState(null)
  const [search,setSearch]= useState("") 
  const [city,setCity]=useState("")

  return (
    <div className="flex flex-col gap-6 bg-blue-950">
      <Header/>
      <Card1 search={search} setSearch={setSearch} setWeatherData={setWeatherData} setCity={setCity}/>
      <Card2 weatherData={weatherData} city={city}/>


    </div>
  );
}
