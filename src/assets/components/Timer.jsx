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
    const [incorrectLetters, setIncorrectLetters] = useState([]);

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

    const onTypingStart = () => {
        if(!intervalRef.current){
            startTimer();
        }
    };

    const onTypingEnd = () => {
        if(intervalRef.current){
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    useEffect(() => {
        if(userInput.length > 0 && !intervalRef.current){
            onTypingStart();
        }
    }, [userInput, onTypingStart]);

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
        setTimer(15);
        setReload((prev) => prev + 1);
        setIsTestComplete(false);
        clearInterval(intervalRef.current); // Clear timer when reloading
        setIncorrectLetters([]);
        intervalRef.current = null;
    };


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

            <div className="">
                <GetWords numberOfWords={numberOfWords} onWordsGenerated={setWords} reload={reload} />
                <TypingTest
                    words={words}
                    userInput={userInput}
                    setUserInput={setUserInput}
                    incorrectLetters={incorrectLetters}
                    setIncorrectLetters={setIncorrectLetters}
                    onTypingStart={onTypingStart}
                    onTypingEnd={onTypingEnd}
                />
            </div>

            <div>
                <input type="submit" value="Reload" onClick={reloadButton} />
            </div>
            
        </div>
    );
};

export default Timer;
