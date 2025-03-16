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
        
        // Set timer to mark as inactive after 5 seconds
        inactivityTimerRef.current = setTimeout(() => {
            setIsActive(false);
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

        // Only append new incorrect letters, don’t overwrite or remove existing ones
        if (value.length > userInput.length) { // Only check when adding characters, not backspacing
            const lastTypedIndex = value.length - 1;
            const lastTypedChar = value[lastTypedIndex];
            if (lastTypedChar !== words[lastTypedIndex]) {
                setIncorrectLetters((prev) => {
                    const newIncorrectLetters = [...prev, lastTypedChar];
                    return newIncorrectLetters;
                });
            }
        }

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
            const isCursorHere = index === userInput.length && isFocused && isActive;
            
            return (
                <span key={index}>
                    {isCursorHere && (
                        <span 
                            className={`inline-block w-0.5 h-5 bg-[#43ffaf] align-middle ${cursorBlink ? 'opacity-100' : 'opacity-0'} absolute mt-0.5 mr-0.5`}
                        ></span>
                    )}
                    
                    <span
                        className={
                            `${index < userInput.length
                                ? userInput[index] === char
                                    ? "text-[#e5f7ef]"
                                    : "text-[#ff5f5f]"
                                : "text-[#526777]"}  select-none`
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
        <div onClick={handleMouseClick} className="flex justify-center items-center">
            <div
                className="md:w-[70vw] w-[80vw] h-[10rem] overflow-hidden bg-[#1f232c] relative rounded-lg p-1.5 text-xl"
                onClick={() => {
                    if(inputRef.current){
                        inputRef.current.focus();
                        resetInactivityTimer();
                    }
                }}
            >
                <div className="p-2" style={{ wordBreak: "normal", wordWrap: "break-word", ...blurEffect() }}>
                    {renderTextWithCursor()}
                </div>

                {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center text-[#e5f7ef] text-xl z-1 select-none">
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