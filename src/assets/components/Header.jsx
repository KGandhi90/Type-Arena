import { useState } from "react";
import NoOfWords from "./NoOfWords";
import Timer from "./Timer";

const Header = () => {
    const [activeComponent, setActiveComponent] = useState("words");

    return(
        <div className="p-4">
            <div className="">
                <button onClick={() => setActiveComponent("words")} className="outline rounded-sm mr-4 p-2">
                    Words
                </button>
                <button onClick={() => setActiveComponent("timer")} className="outline rounded-sm p-2">
                    Time
                </button>
            </div>

            <div>
                {activeComponent === "words" && <NoOfWords activeComponent={activeComponent} />}
                {activeComponent === "timer" && <Timer activeComponent={activeComponent} />}
            </div>
        </div>
    )
}

export default Header;