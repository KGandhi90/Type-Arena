const Navbar = () => {
    return(
        <div className="flex
         items-center ml-[1rem] mt-[1rem] mb-10">
            <div className="text-[#e5f7ef] text-[2rem]">
                <h1 className="cursor-pointer select-none">Typing Arena</h1>
            </div>
            <div className="h-[30px] w-[30px]">
                <a href="https://www.github.com/KGandhi90/Typing-Arena" target="_blank"><img src="/github-logo.png" alt="GitHub Logo" /></a>
            </div>
        </div>
    )
}

export default Navbar;