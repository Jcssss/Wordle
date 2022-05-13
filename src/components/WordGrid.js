import WordRow from './WordRow';
import PropTypes from 'prop-types';

const WordGrid = ({words, values}) => {
    return (
        <div className="grid-container">
            {words.map(
                function(word, i) {
                    return <WordRow 
                        key={Math.floor(Math.random() * 100000) + 1} 
                        word={word} 
                        values={values[i]}
                    />
                }
            )}
        </div>
    );
}

WordGrid.propTypes = {
    words: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default WordGrid;