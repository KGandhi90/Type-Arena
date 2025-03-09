import { useEffect, useRef, useState } from "react";

const TypingTest = ({ words, userInput, setUserInput, onTypingStart, onTypingEnd, incorrectLetters, setIncorrectLetters, onReload }) => {
    const typingAreaRef = useRef(null);
    const [tabPressed, setTabPressed] = useState(false);

    useEffect(() => {
        // Focus the typing area when the component mounts
        if (typingAreaRef.current) {
            typingAreaRef.current.focus();
        }
    }, [words]); // Re-focus when words change (like after reload)

    const handleKeyDown = (event) => {
        // Track Tab key state
        if (event.key === "Tab") {
            event.preventDefault();
            setTabPressed(true);
            return;
        }
    
        // Check for Enter when Tab was previously pressed
        if (event.key === "Enter" && tabPressed) {
            event.preventDefault();
            setTabPressed(false);
            onReload(); // Call reload function
            return;
        }
    
        // Reset Tab state for any other key
        if (event.key !== "Tab") {
            setTabPressed(false);
        }
    
        if (event.key.length === 1) {
            if (userInput.length === 0) {
                onTypingStart();
            }
            setUserInput((prev) => {
                const newInput = prev + event.key;
                const index = prev.length;
                if (newInput.length <= words.length && words[newInput.length - 1] !== event.key) {
                    setIncorrectLetters((prevIncorrect) => [...prevIncorrect, index]);
                }
                return newInput;
            });
        } else if (event.key === "Backspace") {
            setUserInput((prev) => {
                const newInput = prev.slice(0, -1);
                // Recalculate incorrect letters based on the new input
                const newIncorrectLetters = [];
                for (let i = 0; i < newInput.length; i++) {
                    if (newInput[i] !== words[i]) {
                        newIncorrectLetters.push(i);
                    }
                }
                setIncorrectLetters(newIncorrectLetters);
                return newInput;
            });
        }
    
        if (userInput.length + 1 === words.length) {
            onTypingEnd();
        }
    };

    // When tab key is released without pressing enter, reset the state
    const handleKeyUp = (event) => {
        if (event.key === "Tab") {
            // Adding a delay to allow Tab+Enter combination to be detected
            setTimeout(() => {
                setTabPressed(false);
            }, 300);
        }
    };

    useEffect(() => {
        setUserInput("");
        setIncorrectLetters([]);
    }, [setUserInput, words]);

    // Split the text into words for display, but track global position
    const renderWords = () => {
        // Your existing renderWords code
        const wordsArray = words.split(" ");
        let currentPosition = 0;
        
        return wordsArray.map((word, wordIndex) => {
            // Create spans for each character in the word
            const wordSpans = word.split("").map((char, charIndex) => {
                const globalIndex = currentPosition + charIndex;
                const isTyped = globalIndex < userInput.length;
                const isCorrect = userInput[globalIndex] === char;
                const isIncorrect = incorrectLetters.includes(globalIndex);
                
                return (
                    <span
                        key={charIndex}
                        className={isTyped ? (isCorrect ? "text-white" : "text-red-500") : "text-black"}
                        style={{ display: "inline-block" }}
                    >
                        {char}
                    </span>
                );
            });
            
            // Update currentPosition to include this word and the space after it
            currentPosition += word.length + 1; // +1 for the space
            
            // Return the word as a span that won't break
            return (
                <span key={wordIndex} className="inline-block mr-1 mb-1">
                    {wordSpans}
                </span>
            );
        });
    };

    return (
        <div>
            <div 
                id="typing-area"
                ref={typingAreaRef}
                className="w-full h-[9rem] overflow-hidden bg-red-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
            >
                <div className="p-2" style={{ wordBreak: "normal", wordWrap: "break-word" }}>
                    {renderWords()}
                </div>
            </div>
        </div>
    );
}

export default TypingTest;