import React, { useEffect, useState, useRef } from "react";
import GetWords from "./GetWords";
import TypingTest from "./TypingTest";

const Timer = () => {
    const [timer, setTimer] = useState(15);
    const numberOfWords = 500;
    const [userInput, setUserInput] = useState("");
    const [words, setWords] = useState("");
    const [reload, setReload] = useState(0);
    const [isTestComplete, setIsTestComplete] = useState(false);
    const intervalRef = useRef(null);

    // useEffect(() => {
    //     console.log("UserInput state updated : ", userInput);
    // }, [userInput])

    const startTimer = () => {
        if (!intervalRef.current && timer > 0) { // Start only if the timer is set
            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if(prev <= 1){
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        setIsTestComplete(true);
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
        setIsTestComplete(false);
        clearInterval(intervalRef.current); // Clear timer when reloading
        intervalRef.current = null;
    };

    const totalCharacters = userInput.length;
    const correctCharacters = userInput.split("").filter((char, i) => char === words[i]).length;
    const incorrectCharacters = totalCharacters - correctCharacters;
    
    const rawWPM = ((totalCharacters / 5) * (60 / (15 - timer))).toFixed(2);
    const netWPM = ((correctCharacters / 5) * (60 / (15 - timer))).toFixed(2);
    const accuracy = totalCharacters > 0 ? ((correctCharacters / totalCharacters) * 100).toFixed(2) : 100;

    return (
        <div>
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
            <div className="mt-4">
                <h2 className="text-xl">{timer}</h2>
            </div>
            {!isTestComplete ? (
                <div className="">
                    <GetWords numberOfWords={numberOfWords} onWordsGenerated={setWords} reload={reload} />
                    <TypingTest words={words} userInput={userInput} setUserInput={setUserInput} />
                </div>
            ) : (
                <div className="mt-4 p-2">
                    <p><b>{rawWPM}</b> RAW WPM</p>
                    <p><b>{netWPM}</b> NET WPM</p>
                    <p><b>{accuracy}%</b> Accuracy</p>
                    <p><b>{totalCharacters}</b> Characters Typed</p>
                </div>
            )}
            <div>
                <button onClick={reloadButton}>Reload</button>
            </div>
        </div>
    );
};

export default Timer;
