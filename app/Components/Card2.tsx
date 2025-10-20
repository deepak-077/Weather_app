const cards=[ 
    { id:0, title:"Feels Like"},
    { id:1, title:"Humidity"},
    { id:2, title:"Wind "},
    { id:3, title:"Precipitation "},

]

const days=[
    { id:0, title:"Mon"},
    { id:1, title:"Tue"},
    { id:2, title:"Wed"},
    { id:3, title:"Thu"},
    { id:4, title:"Fri"},
    { id:5, title:"Sat"},
    { id:6, title:"Sun"},
]
function Card2(){
    return(
        <div>

            {/* temperature */}
            <div className="w-[600px]">
                <img  src="large.svg" alt="" />

            </div>
            <div className="flex gap-5">
                {cards.map((item,index) =>(
                    <div className="bg-gray-500 w-[120px] rounded-lg h-[80px]">Feels Like</div>
           
                ))}
                
            </div>

            <div className="flex flex-col gap-3 ">
                <h1>Daily Forecast</h1>

                <div>
                    {days.map((item,index) =>(
                    <div className="bg-gray-500 w-[70px] rounded-lg h-[100px]">Feels Like</div>
           
                ))}

                </div>
                
                
            </div>

            
        </div>
    )

}
export default Card2