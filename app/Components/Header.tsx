function Header(){
    return (
        <nav className="flex justify-between px-[100px] text-white">
            <div>
                <img src="logo.svg" alt="" />
            
            </div>
            <div className="flex items-center  bg-gray-600 gap-0.5 p-1.5 rounded-lg">
                <img className="size-5" src="cog.png" alt="" />
                Units
                <img className="size-5" src="down.png" alt="" />
            </div>

        </nav>
    )

}
export default Header