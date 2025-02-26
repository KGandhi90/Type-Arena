import { useState, useEffect } from "react";

const TypingTest = ({ words, userInput, setUserInput }) => {
    const [incorrectLetters , setIncorrectLetters] = useState([]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key.length === 1) {
                setUserInput((prev) => {
                    const newInput = prev + event.key;
                    if(newInput.length <= words.length && words[newInput.length - 1] !== event.key){
                        setIncorrectLetters((prevIncorrect) => [...prevIncorrect, newInput.length - 1]);
                    }
                    return newInput;
                });
            } else if (event.key === "Backspace") {
                setUserInput((prev) => prev.slice(0, -1));
            }
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [setUserInput, words]);

    useEffect(() => {
        setUserInput("");
        setIncorrectLetters([]);
    }, [setUserInput, words]);

    useEffect(() => {
        console.log("Incorrect Letters : ", incorrectLetters);
    }, [incorrectLetters]);


    return (
        <div>
            <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                {words.split(" ").map((word, wordIndex) => (
                    <span key={wordIndex} style={{ display: "inline-block", marginRight: "4px" }}>
                        {word.split("").map((char, charIndex) => {
                            const index = words.slice(0, words.indexOf(word)).length + charIndex;
                            const isTyped = index < userInput.length;
                            const isCorrect = userInput[index] === char;
                            const isIncorrect = incorrectLetters.includes(index);
        
                            return (
                                <span
                                    key={charIndex}
                                    className={isTyped ? (isCorrect ? "text-white" : "text-red-500") : "text-black"}
                                    style={{ display: "inline-block", whiteSpace: "pre" }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default TypingTest;