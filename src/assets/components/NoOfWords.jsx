import React, { useState, useEffect } from "react";
import GetWords from "./GetWords";

const NoOfWords = () => {
    const [numberOfWords, setNumberOfWords] = useState(10);
    const [words, setWords] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://random-word-api.vercel.app/api?words=${numberOfWords}`
                );
                const data = await response.json();
                setWords(data); // Update the words state with the fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Call the fetch function
    }, [numberOfWords]);
    
    const handleButtonClick = (num) => {
        setNumberOfWords(num);
    }

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