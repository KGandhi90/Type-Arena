import { useEffect, useRef } from "react";

const TypingTest = ({ words, userInput, setUserInput, onTypingStart, onTypingEnd, setIncorrectLetters }) => {
    const inputRef = useRef(null);

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

    return (
        <div>
            <div
                className="w-full h-[9rem] overflow-hidden bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => inputRef.current && inputRef.current.focus()}
            >
                <div className="p-2" style={{ wordBreak: "normal", wordWrap: "break-word" }}>
                    {words.split("").map((char, index) => (
                        <span
                            key={index}
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
                    ))}
                </div>
            </div>

            {/* Hidden input to capture text */}
            <input
                type="text"
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
