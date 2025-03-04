import { useEffect } from "react";

const TypingTest = ({ words, userInput, setUserInput, onTypingStart, onTypingEnd, incorrectLetters, setIncorrectLetters }) => {

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key.length === 1) {
                if (userInput.length === 0) {
                    onTypingStart();
                }
                setUserInput((prev) => {
                    const newInput = prev + event.key;
                    const index = prev.length;
                    if(newInput.length <= words.length && words[newInput.length - 1] !== event.key){
                        setIncorrectLetters((prevIncorrect) => [...prevIncorrect, index]);
                    }
                    return newInput;
                });
            } else if (event.key === "Backspace") {
                setUserInput((prev) => prev.slice(0, -1));
                setIncorrectLetters((prevIncorrect) => prevIncorrect.slice(0, -1));
            }
            
            if (userInput.length + 1 === words.length) {
                onTypingEnd();
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [userInput, words, setUserInput, onTypingStart, onTypingEnd]);

    useEffect(() => {
        setUserInput("");
        setIncorrectLetters([]);
    }, [setUserInput, words]);

    // Split the text into words for display, but track global position
    const renderWords = () => {
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
            <div className="w-full h-[9rem] overflow-hidden bg-red-400">
                <div className="p-2" style={{ wordBreak: "normal", wordWrap: "break-word" }}>
                    {renderWords()}
                </div>
            </div>
        </div>
    );
}

export default TypingTest;