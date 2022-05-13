import PropTypes from 'prop-types';
import LetterBox from './LetterBox'

const WordRow = ({word, values}) => {
    return (
        word.map(
            function (letter, i) {
                return <LetterBox 
                    key={Math.floor(Math.random() * 100000) + 1}
                    letter={letter} 
                    value={values[i]} 
                />
            }    
        )
    );
}

WordRow.propTypes = {
    word: PropTypes.arrayOf(PropTypes.string)
};

export default WordRow;