import { useEffect } from 'react';

const GetWords = ({ numberOfWords, onWordsGenerated, reload }) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://random-word-api.vercel.app/api?words=500');
                const data = await response.json();
                const words = data.slice(0, numberOfWords).join(" ");
                onWordsGenerated(words);
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [numberOfWords, onWordsGenerated, reload]);

    return null;
}

export default GetWords;