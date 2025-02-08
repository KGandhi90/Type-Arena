import React, { useState, useEffect } from 'react';

const GetWords = ({ numberOfWords }) => {
    const [words, setWords] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://random-word-api.vercel.app/api?words=500');
            const data = await response.json();
            setWords(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const first100Words = words.slice(1, numberOfWords);

    return (
        <div>
            <h1 className='text-3xl text-blue-700 mb-4'>Random Words</h1>
            {first100Words.join(' ')}
        </div>
    );
};

export default GetWords;