import React, { useEffect, useState, useRef, useCallback } from "react";
import GetWords from "./GetWords";
import TypingTest from "./TypingTest";

const Timer = () => {
    const [timer, setTimer] = useState(15);
    const numberOfWords = 500;
    const [userInput, setUserInput] = useState("");
    const [words, setWords] = useState("");
    const [reload, setReload] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        console.log("UserInput state updated : ", userInput);
    }, [userInput])

    const startTimer = () => {
        if (!intervalRef.current && timer > 0) { // Start only if the timer is set
            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if(prev <= 1){
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        return 0;
                    }
                    return prev - 1;
                })
            }, 1000);
        }
    };

    useEffect(() => {
        if(userInput.length > 0 && !intervalRef.current){
            startTimer();
        }
    }, [userInput, startTimer]);

    useEffect(() => {
        return () => {
            if (intervalRef.current){
                clearInterval(intervalRef.current);
            }
        }
    }, []);

    // Resets everything when reloading
    const reloadButton = () => {
        setUserInput("");
        setReload((prev) => prev + 1);
        clearInterval(intervalRef.current); // Clear timer when reloading
        intervalRef.current = null;
    };

    return (
        <div className="p-2">
            <div className="mb-4 mt-2">
                {[15, 30, 60, 120].map((time) => (
                    <button key={time} className="mr-4 outline p-1 rounded-md" onClick={() => {
                        setTimer(time);
                        reloadButton();
                    }}>
                        {time} Seconds
                    </button>
                ))}
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
                <button onClick={reloadButton}>Reload</button>
            </div>
        </div>
    );
};

export default Timer;
