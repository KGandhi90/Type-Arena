import React, { useState } from "react";
import GetWords from "./GetWords";
import TypingTest from "./TypingTest";
import Result from "./Result";

const NoOfWords = () => {
    const [numberOfWords, setNumberOfWords] = useState(10);
    const [words, setWords] = useState("");
    const [userInput, setUserInput] = useState("");
    const [reload, setReload] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [finalTime, setFinalTime] = useState(null);
    const [incorrectLetters, setIncorrectLetters] = useState([]);
    const [isTestComplete, setIsTestComplete] = useState(false); // Track test completion
    const [totalMistakes, setTotalMistakes] = useState(0);

    const reloadButton = () => {
        setUserInput("");
        setReload(prev => prev + 1);
        setFinalTime(null);
        setStartTime(null);
        setIncorrectLetters([]);
        setIsTestComplete(false); // Reset completion state
        setTimeout(() => {
            document.getElementById('typing-area').focus();
        }, 10);
    };
    
    const handleButtonClick = (num) => {
        setNumberOfWords(num);
        reloadButton();
    };
    
    const startTimer = () => {
        if (!startTime) {
            setStartTime(performance.now());
        }
    };

    const stopTimer = () => {
        if (startTime) {
            const endTime = performance.now();
            setFinalTime(((endTime - startTime) / 1000).toFixed(2));
            setStartTime(null);
            setIsTestComplete(true); // Mark test as complete
        }
    };

    return (
        <div>
            {/* Show the word selection and typing test only if test is not complete */}
            {!isTestComplete && (
                <>
                    <div className="mb-4 mt-2">
                        <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(10)}>10 Words</button>
                        <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(25)}>25 Words</button>
                        <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(50)}>50 Words</button>
                        <button className="outline p-1 rounded-md" onClick={() => handleButtonClick(100)}>100 Words</button>
                    </div>
                    <div>
                        <GetWords numberOfWords={numberOfWords} onWordsGenerated={setWords} reload={reload} />
                        <TypingTest 
                            words={words} 
                            userInput={userInput} 
                            setUserInput={setUserInput} 
                            onTypingStart={startTimer} 
                            onTypingEnd={stopTimer} 
                            incorrectLetters={incorrectLetters} 
                            setIncorrectLetters={setIncorrectLetters} 
                            onReload={reloadButton}
                        />
                    </div>
                    <div>
                        <button onClick={reloadButton}>Reload</button>
                    </div>
                </>
            )}

            {/* Show results when test is complete */}
            {isTestComplete && (
                <Result 
                    showResult={isTestComplete} 
                    onTestComplete={() => {}} // No-op
                    onTestReset={reloadButton}
                    userInput={userInput}
                    words={words}
                    typingTime={finalTime} // Pass the calculated time
                    incorrectLetters={incorrectLetters}
                />
            )}
        </div>
    );
};

export default NoOfWords;
