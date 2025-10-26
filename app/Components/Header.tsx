"use client"
import { useState } from "react"

function Header(){
    const [clicked,setClicked]=useState(false)
    return (
        <nav className="flex justify-between items-center px-5 md:px-[100px] text-white mt-3 md:mt-8">
            <div>
                <img className="w-25 md:w-[200px]" src="logo.svg" alt="" />
            
            </div>
            <div className="relative">
                <div className="flex items-center  bg-[#3a3550] gap-0.5 p-1 rounded-lg hover:cursor-pointer" onClick={()=>{
                setClicked(prev=>!prev)
                
                
            }}>
                <img className="size-5" src="cog.png" alt="" />
                Units
                <img className="size-5" src="down.png" alt="" />
            </div>



            <div
          className={`absolute left-0 mt-2 w-[200px] bg-[#3a3550] text-black rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform ${
            clicked
              ? "opacity-100 translate-y-2"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >

            <div className="flex flex-col p-2 gap-2 text-white">
                <h1 className="font-semibold p-1">Switch to Imperial</h1>

                <div className="flex flex-col">
                    <h1 className="font-semibold p-1">Temperature</h1>
                    <span className=" p-1 rounded-lg hover:bg-[#4d466a] hover:cursor-pointer">Celcius</span>
                    <span className="p-1 rounded-lg hover:bg-[#4d466a] hover:cursor-pointer">Farenheit</span>
                </div>
                <hr />

                <div className="flex flex-col">
                    <h1 className="font-semibold p-1">Wind Speed</h1>
                    <span className="p-1 rounded-lg hover:bg-[#4d466a] hover:cursor-pointer">km/h</span>
                    <span className="p-1 rounded-lg hover:bg-[#4d466a] hover:cursor-pointer">mph</span>
                </div>
                <hr />


                <div className="flex flex-col">
                    <h1 className="font-semibold p-1">Precipitation</h1>
                    <span className="p-1 rounded-lg hover:bg-[#4d466a] hover:cursor-pointer">Millimetres(mm)</span>
                    
                </div>

            </div>
        </div>
            </div>
            

            

        </nav>
    )

}
export default Header