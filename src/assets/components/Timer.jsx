import React, { useEffect, useState, useRef } from "react";
import GetWords from "./GetWords";
import TypingTest from "./TypingTest";

const Timer = () => {
    const [timer, setTimer] = useState(0);
    const [numberOfWords, setNumberOfWords] = useState(500);
    const [words, setWords] = useState("");
    const [reload, setReload] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [selectedTime, setSelectedTime] = useState(15);
    const intervalRef = useRef(null);

    // Starts the timer when the user begins typing
    const handleUserStartTyping = () => {
        if (!isRunning && selectedTime > 0) {
            setTimer(selectedTime);
            setIsRunning(true);
        }
    };

    // Countdown logic using useEffect
    useEffect(() => {
        if (isRunning && timer > 0) {
            intervalRef.current = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning, timer]);

    // Resets everything when reloading
    const reloadButton = () => {
        setIsRunning(false);
        setTimer(0);
        setReload((prev) => prev + 1);
    };

    return (
        <div className="p-2">
            <div className="mb-4 mt-2">
                {[15, 30, 60, 120].map((time) => (
                    <button key={time} className="mr-4 outline p-1 rounded-md" onClick={() => setSelectedTime(time)}>
                        {time} Seconds
                    </button>
                ))}
            </div>
            <h1 className='text-3xl text-blue-700 mb-4'>Random Words</h1>
            <div className="w-full h-[9rem] overflow-hidden bg-red-400">
                <GetWords numberOfWords={numberOfWords} onWordsGenerated={setWords} reload={reload} />
                <TypingTest words={words} onUserStartTyping={handleUserStartTyping} />
            </div>
            <div className="mt-4">
                <h2 className="text-xl text-red-600">Time Left: {timer} sec</h2>
            </div>
            <div>
                <button onClick={reloadButton}>Reload</button>
            </div>
        </div>
    );
};

export default Timer;
