import React, { useState } from "react";
import GetWords from "./GetWords";
import TypingTest from "./TypingText";

const NoOfWords = () => {
    const [numberOfWords, setNumberOfWords] = useState(10);
    const [words, setWords] = useState("");
    const [userInput, setUserInput] = useState("");
    const [reload, setReload] = useState(0);
    
    
    const handleButtonClick = (num) => {
        setNumberOfWords(num);
        setUserInput("");
        setReload(prev => prev + 1);
    }

    const reloadButton = () => {
        setUserInput("");
        setReload(prev => prev + 1);
    }

    return (
        <div className="p-2">
            <div className="mb-4 mt-2">
                <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(10)}>10 Words</button>
                <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(25)}>25 Words</button>
                <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(50)}>50 Words</button>
                <button className="outline p-1 rounded-md" onClick={() => handleButtonClick(100)}>100 Words</button>
            </div>
            <h1 className='text-3xl text-blue-700 mb-4'>Random Words</h1>
            <div className="w-full h-[9rem] overflow-hidden bg-red-400">
                <GetWords numberOfWords={numberOfWords} onWordsGenerated={setWords} reload={reload} />
                <TypingTest words={words} userInput={userInput} setUserInput={setUserInput} />
            </div>
            <div>
                <button tabIndex="1" onClick={() => {reloadButton()}}>Reload</button>
            </div>
        </div>
    );
};

export default NoOfWords;