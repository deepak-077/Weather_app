"use client"
import axios from "axios"
import { useState } from "react"

function Card1( {search, setSearch, setWeatherData,setCity} ) {
   
    const [postition,setPosition]=useState({
        latitude:"",
        longitude:"",
    })

    async function getCity() {

        try{
            const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(search)}&count=10&language=en&format=json`)
            const data=response.data.results[0];
            
            const {name,country,latitude,longitude}=data
            const city={name,country}
            setPosition({latitude,longitude})
            getWeatherData(latitude,longitude)
            setCity(city)
        }

        catch(error){
            console.log(error)
        }
      
        
    }
    

     async function getWeatherData(lat,lon) {

        try{
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relative_humidity_2m,precipitation,weathercode,windspeed_10m,snowfall,cloudcover&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)

            console.log(response)
            setWeatherData(response.data)
        }

        catch(error){
            console.log(error)
        }
      
        
    }
    
    return (
        <div className="flex justify-center items-center px-[40px] sm:px-[100px] text-white flex-col gap-[50px] mt-[50px]">
            <div className="text-4xl font-bold text-center">
                How's the sky looking today?
            
            </div>
            <div className="flex flex-col md:flex-row items-center text-white p-1.5 rounded-lg gap-3 w-full max-w-[450px] ">
                <div className="flex relative w-full max-w-[350px]">
                    <img className="size-5 absolute ml-3 mt-2.5" src="search.svg" alt="" />
                    <input className="w-full max-w-[350px] min-w-[150px] rounded-lg p-2 pl-9 bg-[#3a3550] focus:outline-none focus:ring-2 focus:ring-white hover:cursor-pointer" type="text"  placeholder=" Search for a place... " value={search} onChange={(e)=>{
                        setSearch(e.target.value)}
                        
                    }/>

                </div>
                <button className="max-w-[150px] md:max-w-[80px] w-full bg-blue-600 p-2 font-extrabold md:font-semibold rounded-lg hover:cursor-pointer" onClick={getCity} >Search</button>
            </div>

        </div>
    )

}
export default Card1