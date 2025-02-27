import { useRef } from "react";
import NoOfWords from "./NoOfWords";
import Timer from "./Timer";
import TypingTest from "./TypingTest";

const Header = () => {
    const activeComponent = useRef("time");

    const renderComponent = () => {
        if(activeComponent.current === "words") return <NoOfWords />
        return <Timer />
    }

    return(
        <div>
            <button onClick={() => {
                activeComponent.current === "words";
                renderComponent();
            }} className="outline rounded-sm mr-2">
                Words
            </button>
            <button onClick={() => {
                activeComponent.current === "time";
                renderComponent();
            }}>
                Time
            </button>

            <div>
                {renderComponent()}
            </div>
        </div>
    )
}

export default Header;