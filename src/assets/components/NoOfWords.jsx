import React, { useState, useEffect } from "react";
import GetWords from "./GetWords";

const NoOfWords = () => {
    const [numberOfWords, setNumberOfWords] = useState(10);
    
    const handleButtonClick = (num) => {
        setNumberOfWords(num);
    }

    useEffect(() => {
        
    })

    return (
        <div className="p-2">
            <div className="mb-4 mt-2">
                <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(10)}>10 Words</button>
                <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(25)}>25 Words</button>
                <button className="mr-4 outline p-1 rounded-md" onClick={() => handleButtonClick(50)}>50 Words</button>
                <button className="outline p-1 rounded-md" onClick={() => handleButtonClick(100)}>100 Words</button>
            </div>
            <GetWords numberOfWords={numberOfWords} />
        </div>
    );
};

export default NoOfWords;