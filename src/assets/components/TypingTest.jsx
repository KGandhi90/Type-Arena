import { useEffect, useRef, useState } from "react";

const TypingTest = ({ words, userInput, setUserInput, onTypingStart, onTypingEnd, setIncorrectLetters }) => {
    const inputRef = useRef(null);
    const [cursorBlink, setCursorBlink] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const inactivityTimerRef = useRef(null);
    const textContainerRef = useRef(null); // Added ref for the container
    const charRefs = useRef([]); // Added ref array for character spans

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
                        ref={(el) => (charRefs.current[index] = el)} // Ref on inner span
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

    // Scroll logic with reset on restart
    useEffect(() => {
        const container = textContainerRef.current;
        if (!container || !charRefs.current.length) return;

        // Reset scroll to top if userInput is empty (indicating a restart)
        if (userInput === "") {
            container.scrollTop = 0;
            return; // Exit early after resetting
        }

        const charElements = charRefs.current;
        const wordsArray = words.split(" ");
        let charIndex = 0;
        const wordEndIndices = wordsArray.map((word) => {
            charIndex += word.length; // End of word (before space)
            const endIndex = charIndex;
            charIndex += 1; // Skip space
            return endIndex;
        }).filter((index) => index < words.length); // Filter out indices beyond string length

        // Detect lines by checking Y positions of characters
        let lines = [];
        let currentLine = [];
        let lastY = null;
        let lineHeight = null;

        charElements.forEach((charEl, index) => {
            if (!charEl) return;
            const rect = charEl.getBoundingClientRect();
            const currentY = rect.top;
            if (!lineHeight) lineHeight = rect.height; // Set line height from first character

            if (lastY !== null && Math.abs(currentY - lastY) > lineHeight / 2) {
                lines.push(currentLine);
                currentLine = [];
            }
            currentLine.push(index);
            lastY = currentY;
        });
        lines.push(currentLine); // Add the last line

        // Find last word of each line
        const lastWordOfLines = lines.map((line) => {
            const lineChars = line;
            const lastWordEndIndex = wordEndIndices.find((endIdx) => 
                lineChars.includes(endIdx) && endIdx === Math.max(...lineChars.filter(idx => wordEndIndices.includes(idx)))
            );
            return lastWordEndIndex !== undefined ? lastWordEndIndex : line[line.length - 1];
        });

        // Determine current line based on userInput length
        const currentLineIndex = lines.findIndex((line) => 
            line.includes(userInput.length - 1) || (userInput.length > line[line.length - 1] && line === lines[lines.length - 1])
        );

        // Scroll if beyond the first line
        if (currentLineIndex > 0) {
            const scrollAmount = currentLineIndex * lineHeight;
            container.scrollTop = scrollAmount;
        }
    }, [userInput, words]);

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
                <div
                    style={{
                        overflowY: "auto",
                        height: "100%",
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE/Edge
                    }}
                    ref={textContainerRef}
                >
                    <div className="p-2" style={{ wordBreak: "normal", wordWrap: "break-word", ...blurEffect() }}>
                        {renderTextWithCursor()}
                    </div>
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