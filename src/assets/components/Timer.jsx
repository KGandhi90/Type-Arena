import React, { useEffect, useState } from "react";
import GetWords from "./GetWords";
import TypingTest from "./TypingText";

const Timer = () => {
    const [timer, setTimer] = useState(0);
    const [numberOfWords, setNumberOfWords] = useState(500);
    const [words, setWords] = useState("");
    const [userInput, setUserInput] = useState("");
    const [reload, setReload] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (isRunning && timer > 0) {
            const interval = setTimeout(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearTimeout(interval);
        }
    }, [timer, isRunning]);

    const startTimer = (seconds) => {
        setTimer(seconds);
        setIsRunning(true);
    };
    
    const reloadButton = () => {
        setUserInput("");
        setReload((prev) => prev + 1);
    };

    return (
        <div className="p-2">
            <div className="mb-4 mt-2">
                <button className="mr-4 outline p-1 rounded-md" onClick={() => startTimer(15)}>15 Seconds</button>
                <button className="mr-4 outline p-1 rounded-md" onClick={() => startTimer(30)}>30 Seconds</button>
                <button className="mr-4 outline p-1 rounded-md" onClick={() => startTimer(60)}>60 Seconds</button>
                <button className="outline p-1 rounded-md" onClick={() => startTimer(120)}>120 Seconds</button>
            </div>
            <h1 className='text-3xl text-blue-700 mb-4'>Random Words</h1>
            <div className="mt-4">
                <h2 className="text-xl">{timer}</h2>
            </div>
            <div className="w-full h-[9rem] overflow-hidden bg-red-400">
                <GetWords numberOfWords={numberOfWords} onWordsGenerated={setWords} reload={reload} />
                <TypingTest words={words} userInput={userInput} setUserInput={setUserInput} />
            </div>
            <div>
                <button tabIndex="1" onClick={reloadButton}>Reload</button>
            </div>
        </div>
    );
};

export default Timer;
