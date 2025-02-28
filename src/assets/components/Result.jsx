import { useState, useEffect, useRef } from "react";
import Header from "./Header";

const Result = () => {
    const [activeComponent, setActiveComponent] = useState("words");
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [typingTime, setTypingTime] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [words, setWords] = useState("");
    const typingStarted = useRef(false);

    // Track typing start time
    useEffect(() => {
        if (userInput.length === 1 && !typingStarted.current) {
            setStartTime(Date.now());
            typingStarted.current = true;
        }

        if (userInput.length === words.length && words.length > 0) {
            setEndTime(Date.now());
        }
    }, [userInput, words]);

    // Calculate and store typing time
    useEffect(() => {
        if (startTime && endTime) {
            setTypingTime(((endTime - startTime) / 1000)); // Convert ms to seconds
        }
    }, [endTime]);

    return (
        <div>
            {/* Header handles component switching */}
            <Header activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
        </div>
    );
};

export default Result;
