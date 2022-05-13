import KeyButton from './KeyButton';
import PropTypes from 'prop-types';

const ButtonRow = ({texts, onClick, values}) => {
    return (
        <>
            {texts.map(function (text, i) {
                return <KeyButton 
                    key={text} 
                    text={text} 
                    isLetter={text.length === 1} 
                    onClick={onClick}
                    value={values[i]}
                />
            })}
        </>
    );
}

ButtonRow.propTypes = {
    text: PropTypes.arrayOf(PropTypes.string)
};

export default ButtonRow;