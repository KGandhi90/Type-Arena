import { useEffect, useRef, useState } from "react";

const TypingTest = ({ words, userInput, setUserInput, onTypingStart, onTypingEnd, setIncorrectLetters }) => {
    const inputRef = useRef(null);
    const [cursorBlink, setCursorBlink] = useState(true);

    // Add cursor blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setCursorBlink(prev => !prev);
        }, 530); // Standard cursor blink rate

        return () => clearInterval(blinkInterval);
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [words]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        
        if (userInput.length === 0) {
            onTypingStart();
        }

        setUserInput(value);

        // Track incorrect letters
        const newIncorrectLetters = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] !== words[i]) {
                newIncorrectLetters.push(i);
            }
        }
        setIncorrectLetters(newIncorrectLetters);

        if (value.length === words.length) {
            onTypingEnd();
        }
    };

    // Render text with cursor
    const renderTextWithCursor = () => {
        return words.split("").map((char, index) => {
            // Determine if cursor should appear at this position
            const isCursorHere = index === userInput.length;
            
            return (
                <span key={index}>
                    {/* Show cursor before character if this is the current typing position */}
                    {isCursorHere && (
                        <span 
                            className={`inline-block w-0.5 h-5 bg-white align-middle ${cursorBlink ? 'opacity-100' : 'opacity-0'} absolute mt-0.5 mr-0.5`}
                        ></span>
                    )}
                    
                    <span
                        className={
                            index < userInput.length
                                ? userInput[index] === char
                                    ? "text-white"
                                    : "text-red-500"
                                : "text-black"
                        }
                    >
                        {char}
                    </span>
                </span>
            );
        });
    };

    return (
        <div>
            <div
                className="w-full h-[9rem] overflow-hidden bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                onClick={() => inputRef.current && inputRef.current.focus()}
            >
                <div className="p-2" style={{ wordBreak: "normal", wordWrap: "break-word" }}>
                    {renderTextWithCursor()}
                </div>
            </div>

            {/* Hidden input to capture text */}
            <input
                type="text"
                id="typing-area"
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                className="absolute opacity-0"
                autoComplete="off"
            />
        </div>
    );
};

export default TypingTest;