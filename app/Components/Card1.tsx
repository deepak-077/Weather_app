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
            const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
            console.log(response)
            setWeatherData(response.data)
        }

        catch(error){
            console.log(error)
        }
      
        
    }
    
    

    
    return (
        <div className="flex justify-center items-center  px-[100px] text-white flex-col gap-[50px] mt-[50px]">
            <div className="text-4xl">
                How's the sky looking today?
            
            </div>
            <div className="flex items-center text-white p-1.5 rounded-lg gap-3">
                <div className="flex relative">
                    <img className="size-5 absolute ml-3 mt-2.5" src="search.svg" alt="" />
                    <input className="w-[350px] rounded-lg p-2 pl-9 bg-[#3a3550] focus:outline-none focus:ring-2 focus:ring-white hover:cursor-pointer" type="text"  placeholder=" Search for a place... " value={search} onChange={(e)=>{
                        setSearch(e.target.value)}
                        
                    }/>

                </div>
                <button className="bg-blue-600 p-2 font-semibold rounded-lg hover:cursor-pointer" onClick={getCity} >Search</button>
            </div>

        </div>
    )

}
export default Card1