import React, { useState } from "react";
import GetWords from "./GetWords";
import TypingTest from "./TypingTest";

const NoOfWords = ({ activeComponent }) => {
    const [numberOfWords, setNumberOfWords] = useState(10);
    const [words, setWords] = useState("");
    const [userInput, setUserInput] = useState("");
    const [reload, setReload] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    
    const handleButtonClick = (num) => {
        setNumberOfWords(num);
        setUserInput("");
        setReload(prev => prev + 1);
        setStartTime(null);
        setEndTime(null);
    }

    const handleTypingStart = () => {
        if (!startTime) {
            setStartTime(Date.now());
        }
    };

    const handleTypingEnd = () => {
        if (startTime && !endTime) {
            setEndTime(Date.now());
        }
    };

    const reloadButton = () => {
        setUserInput("");
        setReload(prev => prev + 1);
    }

    return (
        <div>
            <div className="mb-4 mt-2">
                <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(10)}>10 Words</button>
                <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(25)}>25 Words</button>
                <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(50)}>50 Words</button>
                <button className="outline p-1 rounded-md" onClick={() => handleButtonClick(100)}>100 Words</button>
            </div>
            <div>
                <GetWords numberOfWords={numberOfWords} onWordsGenerated={setWords} reload={reload} />
                <TypingTest words={words} userInput={userInput} setUserInput={setUserInput} onTypingStart={handleTypingStart} onTypingEnd={handleTypingEnd} />
            </div>
            {activeComponent === "words" && startTime && endTime && (
                <div className="mt-4 p-2">
                    <h2 className="text-lg font-bold">Typing Time</h2>
                    <p>You took <b>{((endTime - startTime) / 1000).toFixed(2)} seconds</b> to type {words.split(" ").length} words.</p>
                </div>
            )}
            <div>
                <button tabIndex="1" onClick={() => {reloadButton()}}>Reload</button>
            </div>
        </div>
    );
};

export default NoOfWords;