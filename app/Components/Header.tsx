function Header(){
    return (
        <nav className="flex justify-between items-center px-5 md:px-[100px] text-white mt-3 md:mt-8">
            <div>
                <img className="w-25 md:w-[200px]" src="logo.svg" alt="" />
            
            </div>
            <div className="flex items-center  bg-[#3a3550] gap-0.5 p-1 rounded-lg hover:cursor-pointer">
                <img className="size-5" src="cog.png" alt="" />
                Units
                <img className="size-5" src="down.png" alt="" />
            </div>

        </nav>
    )

}
export default Header