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
function Card2(){
    return(
        <div className="flex gap-6 justify-center">
            
            {/* left component */}
            <div className=" flex flex-col gap-6">
                {/* temperature */}
            <div className="w-[600px]">
                <img  src="large.svg" alt="" />

            </div>
            <div className="flex gap-5">
                {cards.map((item,index) =>(
                    <div key={item.id} className="bg-[#3a3550] w-[120px] rounded-lg h-[80px]">Feels Like</div>
           
                ))}
                
            </div>

            <div className="flex flex-col gap-3 text-white">
                <h1>Daily Forecast</h1>

                <div className="flex gap-3">
                    {days.map((item,index) =>(
                    <div key={item.id} className="bg-[#3a3550] w-[70px] rounded-lg h-[100px] flex flex-col justify-center items-center">
                        <span className="text-sm">{item.title}</span>
                        <img className="size-[50px]" src={item.img} alt="" />
                        <div className="flex text-sm justify-between">
                            <span>{item.high}</span>
                            <span>{item.low}</span>
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
                        {hour.map((item , index)=>(
                            <div key={item.id} className="flex justify-between items-center w-[240px] p-1 rounded-lg shadow-lg text-white">
                                <div className="flex items-center">
                                    <img className="size-[36px]" src={item.img} alt="" />
                                    {item.time}

                                </div>

                                <div>
                                    {item.temp}

                                </div>
                                
                                
                            </div>
                        ))}
                    </div>


            </div>

            

            
        </div>
    )

}
export default Card2