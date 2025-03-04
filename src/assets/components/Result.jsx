import { useState, useEffect, useRef } from "react";

const Result = ({ onTestComplete, onTestReset, showResult }) => {
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
            onTestComplete();
        }
    }, [userInput, words, onTestComplete]);

    // Calculate and store typing time
    useEffect(() => {
        if (startTime && endTime) {
            setTypingTime(((endTime - startTime) / 1000)); // Convert ms to seconds
        }
    }, [endTime]);

    const handleReset = () => {
        setStartTime(null);
        setEndTime(null);
        setTypingTime(null);
        setUserInput("");
        setWords("");
        typingStarted.current = false;
        onTestReset();
    }

    if(!showResult){
        return null;
    }

    return (
        <div>
            <p>Typing Time : {typingTime}</p>
            <button onClick={handleReset}>
                Reload
            </button>
        </div>
    )
};

export default Result;
