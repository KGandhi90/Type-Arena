import { useState } from "react";
import NoOfWords from "./NoOfWords";
import Timer from "./Timer";

const Header = () => {
    const [activeComponent, setActiveComponent] = useState("words");

    return(
        <div className="p-4">
            <div className="text-center">
                <button onClick={() => setActiveComponent("words")} className="bg-[#0b1822] text-[#326984] rounded-md mr-4 p-2 w-[5rem]">
                    Words
                </button>
                <button onClick={() => setActiveComponent("timer")} className="bg-[#0b1822] text-[#326984] rounded-md p-2 w-[5rem]">
                    Time
                </button>
                <div className="h-[30px] w-[30px] float-right flex justify-center items-center">
                    <a href="https://www.github.com/KGandhi90" target="_blank"><img src="/github-logo.png" alt="GitHub Logo" height="25px" width="25px" /></a>
                </div>
            </div>

            <div className="flex justify-center items-center">
                {activeComponent === "words" && <NoOfWords activeComponent={activeComponent} />}
                {activeComponent === "timer" && <Timer activeComponent={activeComponent} />}
            </div>
        </div>
    )
}

export default Header;