function Card1(){
    return (
        <div className="flex justify-center items-center  px-[100px] text-white flex-col gap-[50px] mt-[50px]">
            <div className="text-4xl">
                How's the sky looking today?
            
            </div>
            <div className="flex items-center text-white p-1.5 rounded-lg gap-3">
                <div className="flex relative">
                    <img className="size-5 absolute ml-3 mt-2.5" src="search.svg" alt="" />
                    <input className="w-[350px] rounded-lg p-2 bg-gray-600 " type="text"  placeholder=" Search for a place... "/>

                </div>
                <button className="bg-blue-600 p-2 font-semibold rounded-lg">Search</button>
            </div>

        </div>
    )

}
export default Card1