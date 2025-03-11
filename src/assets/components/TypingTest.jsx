import { useEffect, useRef, useState } from "react";

const TypingTest = ({ words, userInput, setUserInput, onTypingStart, onTypingEnd, setIncorrectLetters }) => {
    const inputRef = useRef(null);
    const [cursorBlink, setCursorBlink] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const inactivityTimerRef = useRef(null);
    
    // Reset inactivity timer
    const resetInactivityTimer = () => {
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }
        
        setIsActive(true);
        // inputRef.current = false;
        
        // Set timer to mark as inactive after 5 seconds
        inactivityTimerRef.current = setTimeout(() => {
            setIsActive(false);
            inputRef.current = false;
        }, 10000);
    };

    // Add cursor blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setCursorBlink(prev => !prev);
        }, 530); // Standard cursor blink rate

        // Initial inactivity timer
        resetInactivityTimer();

        return () => {
            clearInterval(blinkInterval);
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
            }
        };
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

    // Handle focus and blur events
    const handleFocus = () => {
        setIsFocused(true);
        resetInactivityTimer();
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    // Track mouse movement
    const handleMouseClick = () => {
        resetInactivityTimer();
    };

    // Track key press events
    const handleKeyDown = () => {
        resetInactivityTimer();
    };

    // Render text with cursor
    const renderTextWithCursor = () => {
        return words.split("").map((char, index) => {
            // Determine if cursor should appear at this position
            // Show cursor only when: focused AND active AND at current typing position
            const isCursorHere = index === userInput.length && isFocused && isActive;
            
            return (
                <span key={index}>
                    {/* Show cursor before character if conditions are met */}
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

    const blurEffect = () => {
        return{
            filter: isActive ? 'blur(0px)' : 'blur(5px)'
        }
    }

    return (
        <div onClick={handleMouseClick}>
            <div
                className="w-full h-[9rem] overflow-hidden bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                onClick={() => {
                    inputRef.current && inputRef.current.focus();
                    resetInactivityTimer();
                }}
            >
                <div className="p-2" style={{ wordBreak: "normal", wordWrap: "break-word", ...blurEffect() }}>
                    {renderTextWithCursor()}
                </div>

                {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center text-white text-xl z-1 select-none">
                        Click To Resume Typing
                    </div>
                )}
            </div>

            {/* Hidden input to capture text */}
            <input
                type="text"
                id="typing-area"
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0"
                autoComplete="off"
            />
        </div>
    );
};

export default TypingTest;