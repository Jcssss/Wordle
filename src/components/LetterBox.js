import PropTypes from 'prop-types';

/*
value has 4 possible outcomes:
    0: no value
    1: incorrect spot and letter
    2: correct letter and incorrect spot
    3: correct letter and spot
*/
const possibleVals = ["", "incorrect", "partial-correct", "correct"]

const LetterBox = ({letter, value}) => {
    return (
        <div className={`grid-item ${possibleVals[value]}`}>
            {letter}
        </div>
    );
}

LetterBox.propTypes = {
    letter: PropTypes.string,
    value: PropTypes.number
}

export default LetterBox;