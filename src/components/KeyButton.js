import PropTypes from 'prop-types';

/*
value has 4 possible outcomes:
    0: no value
    1: incorrect spot and letter
    2: correct letter and incorrect spot
    3: correct letter and spot
*/
const possibleVals = ["", "incorrect", "partial-correct", "correct"]

const KeyButton = ({text, isLetter, onClick, value}) => {
    const action = () => {
        if (isLetter) {
            onClick.insert(text);
        } else if (text === "Backspace") {
            onClick.remove();
        } else if (text === "Enter") {
            onClick.submit();
        }
    };

    return (
        <button 
            className={`keyboard-item ${isLetter? "letter" : ""} ${possibleVals[value]}`} 
            onClick = {() => action()}
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
        >
            {text}
        </button>
    );
}

KeyButton.propTypes = {
    text: PropTypes.string,
    isLetter: PropTypes.bool
};


export default KeyButton;