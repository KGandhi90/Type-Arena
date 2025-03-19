# Typing Arena

Typing Arena is a typing speed test application built with ReactJS and Tailwind CSS. It allows users to measure their typing speed by completing a test based on either a word limit or a time limit.

## Features

- **Word-based Typing Test**: Select from 10, 25, 50, or 100 words.
- **Time-based Typing Test**: Choose between 15, 30, 60, or 120 seconds.
- **Live Accuracy & Speed Calculation**: Get real-time feedback on WPM (words per minute) and accuracy.
- **Custom Word Generator**: Randomly selects words for each test.
- **Reload Button**: Restart the test instantly.

## Live Demo

Try the live version here: [Typing Arena](https://typingarena.vercel.app)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/KGandhi90/Typing-Arena.git
   cd Typing-Arena
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```

## File Structure

- `GetWords.jsx` - Generates random words for the typing test.
- `Header.jsx` - Provides UI for selecting words or time mode.
- `Navbar.jsx` - Contains the app title and GitHub link.
- `NoOfWords.jsx` - Handles word-based typing tests.
- `ReloadButton.jsx` - Component for restarting the test.
- `Result.jsx` - Displays WPM, accuracy, and total characters typed.
- `Timer.jsx` - Handles time-based typing tests.
- `TypingTest.jsx` - Core typing functionality, input handling, and word matching.

## Usage

1. Choose either a word limit or a time limit.
2. Start typing when the test begins.
3. The test ends automatically when all words are typed or time runs out.
4. View your results, including speed and accuracy.
5. Use the reload button to try again.

## Technologies Used

- ReactJS
- Tailwind CSS
- JavaScript (ES6+)
- Vite (for fast development)

## Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.
