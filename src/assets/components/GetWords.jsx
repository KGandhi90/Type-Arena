import React, { useState, useEffect } from 'react';

const GetWords = ({ numberOfWords, reload }) => {
    const [words, setWords] = useState([]);
    const [char, setChar] = useState([]);

    const fetchData = async () => {
        setWords([]);
        setChar([]);

        try {
            const response = await fetch('https://random-word-api.vercel.app/api?words=500');
            const data = await response.json();
            setWords(data);
            const charArray = data.slice(0, numberOfWords).join("").split("");
            setChar(charArray);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [numberOfWords, reload]);

    useEffect(() => {
        console.log("Characters Array : ", char);
    }, [char]);

    const firstNWords = words.slice(0, numberOfWords);

    return (
        <div>
            {firstNWords.join(' ')}
        </div>
    );
};

export default GetWords;