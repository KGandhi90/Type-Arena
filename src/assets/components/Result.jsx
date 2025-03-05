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

    const totalCharacters = userInput.length;
    const correctCharacters = userInput.split("").filter((char, i) => char === words[i]).length;
    const incorrectCharacters = totalCharacters - correctCharacters;

    const rawWPM = ((totalCharacters / 5) * (60 / (15 - timer))).toFixed(2);
    const netWPM = ((correctCharacters / 5) * (60 / (15 - timer))).toFixed(2);
    const accuracy = totalCharacters > 0 ? ((correctCharacters / totalCharacters) * 100).toFixed(2) : 100;

    return (
        <div>
            <p><b>{rawWPM}</b> RAW</p>
            <p><b>{netWPM}</b> WPM</p>
            <p><b>{accuracy}%</b> ACC</p>
            <p><b>{totalCharacters}</b> Characters Typed</p>
            <button onClick={handleReset}>
                Reload
            </button>
        </div>
    )
};

export default Result;
