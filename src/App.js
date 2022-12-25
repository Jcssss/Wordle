import React, { useState, useEffect, useCallback } from 'react';
import Keyboard from './components/Keyboard';
import Menu from './components/Menu';
import WordGrid from './components/WordGrid';
import raw from './dict.txt';

const App = () => {
    const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const [message, setMessage] = useState("");
    const [gameState, setGameState] = useState(1);
    const [letterVals, setLetterVals] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [gameNum, setGameNum] = useState(1);
    const [dict, setDict] = useState([]);
    const [chosenWord, setChosenWord] = useState("");
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);
    const [words, setWords] = useState([
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ]);
    const [values, setValues] = useState([
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ]);

    // Initializes event listener
    useEffect(() => {
        document.addEventListener('keydown', detectKey);
        return () => {
            document.removeEventListener("keydown", detectKey);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [column, gameNum]);

    /* initDict
     * initializes the game's dictionary
     */
    const initDict = useCallback(() => {
        fetch(raw)
            .then(raw => raw.text())
            .then(text => text.toUpperCase())
            .then(text => text.replace(/\r/gm, ''))
            .then(text => setDict(text.split("\n")));
    }, []);

    // Initializes dictionary
    useEffect(() => {
        initDict();
    }, [initDict]);

    /* chooseWord
     * chooses a new word for players to guess
     */
    const chooseWord = useCallback(() => {
        var index = Math.floor(Math.random() * dict.length);
        setChosenWord(dict[index]);
    }, [dict]);

    // Chooses a word for the first game on page load
    useEffect(() => {
        chooseWord();
    }, [dict, chooseWord]);

    // Checks if the player has lost whenever the row number updates
    useEffect(() => {
        if (gameState !== 2 && row === 6) {
            setGameState(0);
        }
    }, [row, gameState]);

    // Updates the message whenever the gameState is updated
    useEffect(() => {
        const compliments = ["Yipee", "Congrats", "Well Done" , "You're the best", "Way to go", "Winner", "You're a genius", "Damn", "Keep up the good work!", "You're a star"];
        if (gameState === 0) {
            setMessage("Game Over! The word was '" + chosenWord + "'.");
        } else if (gameState === 2) {
            var comp = compliments[Math.floor(Math.random() * compliments.length)];
            setMessage(comp + "! The word was '" + chosenWord + "'.");
        } else {
            setMessage("");
        }
    }, [gameState, chosenWord]);

    /* detectKey
     * handles key input
     */
    const detectKey = (e) => {
        var value = e.key;

        if (letters.includes(value.toUpperCase())) {
            insertLetter(value.toUpperCase());
        } else if (value === "Backspace") {
            removeLetter();
        } else if (value === "Enter") {
            checkWord();
        }
    };

    /* resetGrid
     * initializes a new game
     */
    const resetGrid = () => {
        var freshGrid = [
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""]
        ];

        var freshValues = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ];

        setWords(freshGrid);
        setValues(freshValues);
        setColumn(0);
        setRow(0);
        chooseWord()
        setGameNum((gameNum) => gameNum + 1);
        setLetterVals([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        setGameState(1);
    };

    /* insertLetter
     * inserts the last inputted letter
     */
    const insertLetter = (letter) => {

        if (gameState === 1) {

            // copies the words array
            var copy = words.map((word) => {
                return word.slice();
            });

            // ensures a letter can be added
            if (column !== 5 && row < 6) {
                copy[row][column] = letter;
                setColumn(column => column + 1);
                setWords(copy);
            }
        }
    };

    /* removeLetter
     * removes the last inputted letter
     */
    const removeLetter = () => {

        if (gameState === 1) {

            // copies the words array
            var copy = words.map((word) => {
                return word.slice();
            });

            // ensures a letter can be removed
            if (column !== 0) {
                copy[row][column - 1] = "";
                setColumn(column => column - 1);
                setWords(copy);
            }
        }
    }

    /* checkWord
     * Assesses whether input word is correct
     */
    const checkWord = () => {

        // Ensures that a 5 letter word has been given
        if (!(gameState === 1 && column === 5)) {
            return;
        }

        var inputWord = words[row];
        var guessWord = chosenWord.split('');
        var letterValsCopy = letterVals.slice();
        var inputWordValues = [0,0,0,0,0];

        var valuesCopy = values.map((val) => {
            return val.slice();
        });

        // Tracks the number of each letter in the two words
        var inputLetterCounts = [];
        inputLetterCounts.length = 26;
        inputLetterCounts.fill(0);

        var guessLetterCounts = [];
        guessLetterCounts.length = 26;
        guessLetterCounts.fill(0);

        for (var j = 0; j < guessWord.length; j++) {
            inputLetterCounts[letters.indexOf(inputWord[j])]++;
            guessLetterCounts[letters.indexOf(guessWord[j])]++;
        }

        // Checks that the inputted word is valid
        if (dict.includes(inputWord.join(""))) {

            // Checks each letter in the inputted word
            for (var i = 0; i < inputWord.length; i++) {

                // If the letter is in the correct spot
                if (inputWord[i] === guessWord[i]) {

                    // updates it's values
                    inputWordValues[i] = 3;
                    letterValsCopy[letters.indexOf(inputWord[i])] = Math.max(letterValsCopy[letters.indexOf(inputWord[i])], 3);

                // If the letter is in the wrong spot, and it's not possible to have extra letters
                } else if (guessWord.includes(inputWord[i]) && inputLetterCounts[letters.indexOf(inputWord[i])] <= guessLetterCounts[letters.indexOf(inputWord[i])]) {
                    
                    // updates it's values
                    inputWordValues[i] = 2;
                    letterValsCopy[letters.indexOf(inputWord[i])] = Math.max(letterValsCopy[letters.indexOf(inputWord[i])], 2);
                
                // If the letter is in the wrong spot, and it's possible to have extra letters
                } else if (guessWord.includes(inputWord[i])) {
                    
                    // decrease that letters count
                    inputLetterCounts[letters.indexOf(inputWord[i])]--;
                    
                    // update it's values
                    inputWordValues[i] = 1;
                    letterValsCopy[letters.indexOf(inputWord[i])] = Math.max(letterValsCopy[letters.indexOf(inputWord[i])], 0);

                // If the letter is not in the final word
                } else {

                    // update it's values
                    inputWordValues[i] = 1;
                    letterValsCopy[letters.indexOf(inputWord[i])] = Math.max(letterValsCopy[letters.indexOf(inputWord[i])], 1);
                }
            }

            // update state variables
            valuesCopy[row] = inputWordValues;
            setValues(valuesCopy);
            setLetterVals(letterValsCopy);

            setRow(row => row + 1);
            setColumn(0);

            if (inputWord.join("") === chosenWord) {
                setGameState(2);
            }
        }
    }

    return (
        <div>
            <Menu reset={resetGrid}/>
            <WordGrid words={words} values={values}/>
            {message !== "" ? <div>
                <div className="message">{message}</div> 
                <a  className="def" href={"https://www.dictionary.com/browse/" + chosenWord.toLowerCase()}>Click here for definition.</a>
            </div> : <></>}
            <Keyboard onClick={{
                insert: insertLetter,
                remove: removeLetter,
                submit: checkWord
            }} letters={letters} values={letterVals}/>
        </div>
    );
}

export default App;
