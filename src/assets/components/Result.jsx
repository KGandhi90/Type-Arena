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
        <div className="text-[#526777] text-center">
            <div className="flex-cols justify-center items-center text-[1.5rem] mt-[1.5rem]">
                <p><b className="text-[#43ffaf] text-[3rem]">{netWPM}</b> NET WPM</p>
                <p><b className="text-[#43ffaf] text-[1.5rem]">{rawWPM}</b> RAW WPM</p>
                <p><b className="text-[#43ffaf] text-[1.5rem]">{accuracy}%</b> ACC</p>
                <p><b className="text-[#43ffaf] text-[1.5rem]">{totalCharacters}</b> Characters</p>
            </div>
            <ReloadButton reload={onTestReset} />
        </div>
    );
};

export default Result;
