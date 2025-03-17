import React, { useEffect, useState, useRef } from "react";
import GetWords from "./GetWords";
import TypingTest from "./TypingTest";
import Result from "./Result";
import ReloadButton from "./ReloadButton";

const Timer = () => {
    const [timer, setTimer] = useState(15);
    const [selectedTime, setSelectedTime] = useState(0); // Track the selected time
    const numberOfWords = 500;
    const [userInput, setUserInput] = useState("");
    const [words, setWords] = useState("");
    const [reload, setReload] = useState(0);
    const [isTestComplete, setIsTestComplete] = useState(false);
    const intervalRef = useRef(null);
    const [incorrectLetters, setIncorrectLetters] = useState([]);
    const [startTime, setStartTime] = useState(null); // Track start time for WPM calculation

    const startTimer = () => {
        if (!intervalRef.current && timer > 0) {
            setStartTime(performance.now()); // Record start time
            intervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                        setIsTestComplete(true); // Mark test as complete when timer ends
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    const onTypingStart = () => {
        if (!intervalRef.current) {
            startTimer();
        }
    };

    const onTypingEnd = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsTestComplete(true); // Mark as complete if user finishes early
        }
    };

    useEffect(() => {
        if (userInput.length > 0 && !intervalRef.current) {
            onTypingStart();
        }
    }, [userInput]);

    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const reloadButton = (count) => {
        setUserInput("");
        setTimer(count || selectedTime || 15); // Reset timer to the selected time
        setReload((prev) => prev + 1);
        setIsTestComplete(false);
        clearInterval(intervalRef.current);
        setIncorrectLetters([]);
        setStartTime(null);
        intervalRef.current = null;
        setTimeout(() => {
            const typingArea = document.getElementById('typing-area');
            if(typingArea){
                typingArea.focus();
            }
        }, 10);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        setTimer(time);
        reloadButton(time);
    };

    return (
        <div>
            <div className="mb-4 mt-2 flex justify-center items-center">
                {[15, 30, 60].map((time) => (
                    <button
                        key={time}
                        className={`mr-4 bg-[#1f232c] p-1 rounded-md w-[7rem] hover:text-[#e5f7ef] focus:outline-none focus:ring-2 focus:ring-[#e5f7ef] ${selectedTime === time ? 'text-[#43ffaf]' : 'text-[#526777]'}`}
                        onClick={() => handleTimeSelection(time)}
                    >
                        {time} Seconds
                    </button>
                ))}
                <button className={`bg-[#1f232c] p-1 rounded-md w-[7rem] hover:text-[#e5f7ef] focus:outline-none focus:ring-2 focus:ring-[#e5f7ef] ${selectedTime === 120 ? 'text-[#43ffaf]' : 'text-[#526777]'}`} onClick={() => handleTimeSelection(120)}>120 Seconds</button>
            </div>

            {/* Show timer and typing test only if test is not complete */}
            {!isTestComplete && (
                <>
                    <div className="mt-4">
                        <h2 className="text-xl text-[#43ffaf]">{timer}</h2>
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
                            onReload={() => reloadButton(selectedTime)} // Pass selectedTime to reloadButton
                        />
                    </div>
                    <div className="flex justify-center items-center pt-4">
                        <ReloadButton reload={() => reloadButton(selectedTime)} />
                    </div>
                </>
            )}

            {/* Show results when test is complete */}
            {isTestComplete && (
                <Result
                    showResult={isTestComplete}
                    onTestComplete={() => {}} // No-op
                    onTestReset={() => reloadButton(selectedTime)} // Pass selectedTime to reloadButton
                    userInput={userInput}
                    words={words}
                    typingTime={
                        startTime
                            ? ((performance.now() - startTime) / 1000).toFixed(2) // Time from start to end
                            : timer // Fallback to initial timer value if not started
                    }
                    incorrectLetters={incorrectLetters}
                />
            )}
        </div>
    );
};

export default Timer;