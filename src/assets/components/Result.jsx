const Result = ({ onTestReset, showResult, userInput, words, typingTime }) => {
    if (!showResult) {
        return null;
    }

    const totalCharacters = userInput.length;
    const correctCharacters = userInput.split("").filter((char, i) => char === words[i]).length;
    const incorrectCharacters = totalCharacters - correctCharacters;

    // Calculate WPM (words per minute): (characters / 5) * (60 / seconds)
    const rawWPM = ((totalCharacters / 5) * (60 / typingTime)).toFixed(2);
    const netWPM = ((correctCharacters / 5) * (60 / typingTime)).toFixed(2);
    const accuracy = totalCharacters > 0 ? ((correctCharacters / totalCharacters) * 100).toFixed(2) : 100;

    return (
        <div>
            <p><b>{rawWPM}</b> RAW WPM</p>
            <p><b>{netWPM}</b> NET WPM</p>
            <p><b>{accuracy}%</b> ACC</p>
            <p><b>{totalCharacters}</b> Characters Typed</p>
            <button onClick={onTestReset}>
                Reload
            </button>
        </div>
    );
};

export default Result;
