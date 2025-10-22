function Header(){
    return (
        <nav className="flex justify-between px-[100px] text-white mt-8">
            <div>
                <img src="logo.svg" alt="" />
            
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