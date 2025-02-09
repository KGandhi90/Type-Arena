import React, { useState, useEffect } from 'react';

const KeyDetector = () => {
    const [inputText, setInputText] = useState('');

    const handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            setInputText('');
        } else if (event.key.length === 1){
            setInputText(prevText => prevText + event.key);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            <h1>Press any key</h1>
            <p className='max-w-full'>You pressed: {inputText}</p>
        </div>
    );
};

export default KeyDetector;