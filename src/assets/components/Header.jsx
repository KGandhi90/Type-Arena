import { useState } from "react";
import NoOfWords from "./NoOfWords";
import Timer from "./Timer";

const Header = () => {
    const [activeComponent, setActiveComponent] = useState("words");

    return(
        <div className="p-4">
            <div className="text-center">
                <button onClick={() => setActiveComponent("words")} className={`bg-[#1f232c] rounded-md mr-4 p-2 w-[5rem] hover:text-[#e5f7ef] ${activeComponent === "words" ? 'text-[#43ffaf]' : 'text-[#526777]'}`}>
                    Words
                </button>
                <button onClick={() => setActiveComponent("timer")} className={`bg-[#1f232c] rounded-md p-2 w-[5rem] hover:text-[#e5f7ef] ${activeComponent === "timer" ? 'text-[#43ffaf]' : 'text-[#526777]'}`}>
                    Time
                </button>
            </div>

            <div className="flex justify-center items-center">
                {activeComponent === "words" && <NoOfWords activeComponent={activeComponent} />}
                {activeComponent === "timer" && <Timer activeComponent={activeComponent} />}
            </div>
        </div>
    )
}

export default Header;