import weatherIcon from "./weatherIcon";

function Card2({weatherData,city}){
    const {current_weather,hourly,daily}=weatherData || {}

    // Fallback for missing data
  if (!current_weather || !hourly || !daily || !hourly.relative_humidity_2m || !hourly.precipitation) return null;

  const icon=weatherIcon(current_weather.weathercode)


  const now = new Date();
  const nowISOString = new Date().toISOString().slice(0, 13) + ":00"; 


  const hourIndex = hourly.time.findIndex(time => time === nowISOString);

  const idx = hourIndex >= 0 ? hourIndex : 0;
  const currentHumidity = hourly.relative_humidity_2m[idx] ?? "N/A";
  const currentPrecipitation = hourly.precipitation[idx] ?? "N/A";

    
    const hourlyTemps = hourly.time.slice(0, 8).map((time, index) => ({
    time: new Date(time).toLocaleTimeString([], { hour: '2-digit' }),
    temp: hourly.temperature_2m[index],
  }))

const today = new Date();
const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
const date = today.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });



    return(
        <div className="flex flex-col md:flex-row gap-6 justify-center ">
            
            {/* left component */}
            <div className="w-full max-w-[600px] flex flex-col gap-6">
                
                {/* temperature */}
            <div className=" text-white bg-[url('/large.svg')] bg-cover bg-center h-[200px] rounded-2xl flex flex-col sm:flex-row justify-between items-center p-5" >
                <div className="font-bold">
                    <p>{city.name},{city.country} </p>
                    <p>{dayName}, {date}</p> 
                </div>

                <div>
                    <p className="text-5xl font-bold"> {current_weather.temperature}°C</p>
                </div>
                
            </div>


            <div className="grid grid-cols-2 gap-2 md:grid-cols-4  md:gap-5">

                {/* info Cards */}
                
                <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white p-2">
                    
                    <p>Feels Like</p>
                    <p>{current_weather.temperature}°C</p>
                    
                </div>

                <div className="bg-[#3a3550] w-[120px] rounded-lg h-[80px] text-white p-2">
                    
                    <p>Wind</p>
                    <p>{current_weather.windspeed}km/hr</p>
                    
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

            <div className="flex flex-col gap-3 text-white">
                <h1>Daily Forecast</h1>

                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-1 lg:gap-3">
                    {daily.time.map((day,index) =>(
                    <div key={index} className="bg-[#3a3550] w-[70px] rounded-lg h-[100px] flex flex-col justify-center items-center">
                        <span className="text-sm">{new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}</span>
                        <img className="size-[50px]" src={icon} alt="icon" />
                        <div className="flex  justify-between">
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
                    <div className="flex justify-around shadow-lg rounded-lg p-1.5 text-md items-center">{dayName}
                        <img className="size-5" src="down.png" alt="down" />
                    </div>

                </div>
                <div className="flex flex-col items-center gap-2 ">
                        {hourlyTemps.map((item , index)=>(
                            <div key={index} className="flex justify-between items-center w-[240px] p-1 rounded-lg shadow-lg text-white">
                                <div className="flex items-center">
                                    <img className="size-[36px]" src={icon} alt="weather icon" />
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