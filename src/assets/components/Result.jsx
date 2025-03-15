import ReloadButton from "./ReloadButton";

const Result = ({ onTestReset, showResult, userInput, words, typingTime, incorrectLetters }) => {
    if (!showResult) {
        return null;
    }

    const totalCharacters = userInput.length;
    const correctCharacters = userInput.split("").filter((char, i) => char === words[i]).length;

    // Calculate WPM (words per minute): (characters / 5) * (60 / seconds)
    const rawWPM = ((totalCharacters / 5) * (60 / typingTime)).toFixed(2);
    const netWPM = ((correctCharacters / 5) * (60 / typingTime)).toFixed(2);
    const totalAttempts = totalCharacters + (incorrectLetters.length); // Total characters attempted, including mistakes
    const accuracy = totalAttempts > 0 ? ((correctCharacters / totalAttempts) * 100).toFixed(2) : 100;

    return (
        <div className="text-[#56c3b7] text-center">
            <div className="flex-cols justify-center items-center text-[1.5rem] mt-[1.5rem]">
                <p><b>{rawWPM}</b> RAW WPM</p>
                <p><b>{netWPM}</b> NET WPM</p>
                <p><b>{accuracy}%</b> ACC</p>
                <p><b>{totalCharacters}</b> Characters Typed</p>
            </div>
            <ReloadButton reload={onTestReset} />
        </div>
    );
};

export default Result;
