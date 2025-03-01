import React, { useState } from "react";
import GetWords from "./GetWords";
import TypingTest from "./TypingTest";

const NoOfWords = ({ activeComponent }) => {
    const [numberOfWords, setNumberOfWords] = useState(10);
    const [words, setWords] = useState("");
    const [userInput, setUserInput] = useState("");
    const [reload, setReload] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finalTime, setFinalTime] = useState(null);
    const [incorrectLetters, setIncorrectLetters] = useState([]);

    const reloadButton = () => {
        setUserInput("");
        setReload(prev => prev + 1);
        setFinalTime(null);
        setIncorrectLetters([]);
    }
    
    const handleButtonClick = (num) => {
        setNumberOfWords(num);
        reloadButton();
        setStartTime(null);
        setFinalTime(null);
    };
    
    const startTimer = () => {
        if (!startTime) {
            setStartTime(performance.now());
        }
    };

    const stopTimer = () => {
        if(startTime) {
            const endTime = performance.now();
            setFinalTime(((endTime - startTime) / 1000).toFixed(2));
            setStartTime(null);
        }
    };


    const totalCharacters = userInput.length;
    const incorrectCount = incorrectLetters.length;
    const correctCharacters = totalCharacters - incorrectCount;

    const rawWPM = ((totalCharacters / 5) / (finalTime / 60)).toFixed(2);
    const netWPM = ((correctCharacters / 5) / (finalTime / 60)).toFixed(2);
    const accuracy = ((1 - incorrectCount / totalCharacters) * 100).toFixed(2);

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
                <TypingTest words={words} userInput={userInput} setUserInput={setUserInput} onTypingStart={startTimer} onTypingEnd={stopTimer} incorrectLetters={incorrectLetters} setIncorrectLetters={setIncorrectLetters} />
            </div>
            {activeComponent === "words" && finalTime !== null && (
                <div className="mt-4 p-2">
                    <p><b>{rawWPM}</b> RAW</p>
                    <p><b>{netWPM}</b> WPM</p>
                    <p><b>{finalTime}</b> SEC</p>
                    <p><b>{accuracy}</b>% ACC</p>
                </div>
            )}
            <div>
                <button tabIndex="1" onClick={() => {reloadButton()}}>Reload</button>
            </div>
        </div>
    );
};

export default NoOfWords;