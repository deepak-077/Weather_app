const cards=[ 
    { id:0, title:"Feels Like"},
    { id:1, title:"Humidity"},
    { id:2, title:"Wind "},
    { id:3, title:"Precipitation "},

]

const days=[
    { id:0, title:"Mon", img:"icon-rain.webp", high:24, low:15},
    { id:1, title:"Tue", img:"icon-drizzle.webp", high:21, low:16},
    { id:2, title:"Wed", img:"icon-sunny.webp", high:20, low:14},
    { id:3, title:"Thu", img:"icon-partly-cloudy.webp", high:22, low:18},
    { id:4, title:"Fri", img:"icon-storm.webp", high:24, low:15},
    { id:5, title:"Sat", img:"icon-snow.webp", high:24, low:15},
    { id:6, title:"Sun", img:"icon-fog.webp", high:24, low:15},
]

const hour=[
    { id:0,time:"3 PM" , temp:20, img:"icon-rain.webp",},
    { id:1,time:"4 PM" , temp:20, img:"icon-drizzle.webp"},
    { id:2,time:"5 PM" , temp:20, img:"icon-sunny.webp"},
    { id:3,time:"6 PM" , temp:20, img:"icon-partly-cloudy.webp"},
    { id:4,time:"7 PM" , temp:20, img:"icon-storm.webp"},
    { id:5,time:"8 PM" , temp:20, img:"icon-snow.webp"},
    { id:6,time:"9 PM" , temp:20, img:"icon-fog.webp"},
    { id:7,time:"10 PM", temp:20, img:"icon-fog.webp"},
]
function Card2({weatherData,city}){
    const {current_weather,hourly,daily}=weatherData || {}

    // Fallback for missing data
  if (!current_weather || !hourly || !daily) return null

  // Get current humidity and precipitation from the latest hourly data
  const latestIndex = hourly.time.findIndex((t) =>
    t.startsWith(current_weather.time.split("T")[0])
  );

  const safeIndex = latestIndex !== -1 ? latestIndex : 0;


  const humidity =
    hourly.humidity_2m && hourly.humidity_2m[safeIndex] !== undefined
      ? hourly.humidity_2m[safeIndex]
      : "N/A";

  const precipitation =
    hourly.precipitation && hourly.precipitation[safeIndex] !== undefined
      ? hourly.precipitation[safeIndex]
      : "N/A";
    
    const hourlyTemps = hourly.time.slice(0, 8).map((time, index) => ({
    time: new Date(time).toLocaleTimeString([], { hour: '2-digit' }),
    temp: hourly.temperature_2m[index],
  }))

  const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
const date = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });



    return(
        <div className="flex gap-6 justify-center">
            
            {/* left component */}
            <div className=" flex flex-col gap-6">
                {/* temperature */}
            <div className="w-[600px] text-white">
                <div className="absolute font-bold mt-[90px] pl-5">
                    <p>{city.name},{city.country} </p>
                    <p>{dayName}, {date}</p>
                    
                    <p className="text-5xl pl-[400px] pb[90px]"> {current_weather.temperature}°C</p>
                </div>
                <img  src="large.svg" alt="" />

            </div>
            <div className="flex gap-5">

                {/* info Cards */}
                
                <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white">
                    <div>
                    <p>Feels Like</p>
                    <p>{current_weather.temperature}°C</p>
                    </div>
                </div>

                <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white">
                    <div>
                    <p>Wind</p>
                    <p>{current_weather.windspeed}km/hr</p>
                    </div>
                </div>

                <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white">
                    <div>
                    <p>Feels Like</p>
                    <p>{precipitation}mm</p>
                    </div>
                </div>

                <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white">
                    <div>
                    <p>Humidity</p>
                    <p>{humidity}%</p>
                    </div>
                </div>
                
           
                
                
            </div>

            <div className="flex flex-col gap-3 text-white">
                <h1>Daily Forecast</h1>

                <div className="flex gap-3">
                    {daily.time.map((day,index) =>(
                    <div key={index} className="bg-[#3a3550] w-[70px] rounded-lg h-[100px] flex flex-col justify-center items-center">
                        <span className="text-sm">{new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <img className="size-[50px]" src="icon-sunny.webp" alt="" />
                        <div className="flex text-sm justify-between">
                            <span>{daily.temperature_2m_max[index]}°</span>
                            <span>{daily.temperature_2m_min[index]}°</span>
                        </div>
                        
                        
                    </div>
           
                ))}

                </div>
                
                
            </div>

            </div>

            {/* right component */}
            <div className="bg-[#3a3550] w-[300px] p-2 rounded-2xl">
                <div className="flex justify-around mb-3 text-md items-center text-white">

                    <h1>Hourly Forecast</h1>
                    <div className="flex justify-around shadow-lg rounded-lg p-1.5 text-md items-center">Monday
                        <img className="size-5" src="down.png" alt="down" />
                    </div>

                </div>
                <div className="flex flex-col items-center gap-2 ">
                        {hourlyTemps.map((item , index)=>(
                            <div key={index} className="flex justify-between items-center w-[240px] p-1 rounded-lg shadow-lg text-white">
                                <div className="flex items-center">
                                    <img className="size-[36px]" src="icon-sunny.webp" alt="" />
                                    {item.time}

                                </div>

                                <div>
                                    {item.temp}°C

                                </div>
                                
                                
                            </div>
                        ))}
                    </div>


            </div>

            

            
        </div>
    )

}
export default Card2