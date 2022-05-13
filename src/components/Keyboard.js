import ButtonRow from "./ButtonRow";

const ButtonTextOne = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
const ButtonTextTwo = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
const ButtonTextThree = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"]

const Keyboard = ({onClick, letters, values}) => {

    const getValue = (letter) => {
        var index = letters.indexOf(letter);
        return (index !== -1) ? values[index] : 0;
    }
    
    const ButtonValsOne = ButtonTextOne.map((letter) => {
        return getValue(letter);
    });

    const ButtonValsTwo = ButtonTextTwo.map((letter) => {
        return getValue(letter);
    });

    const ButtonValsThree = ButtonTextThree.map((letter) => {
        return getValue(letter);
    });

    return (
        <div className="keyboard">
            <div>
                <ButtonRow texts={ButtonTextOne} onClick={onClick} values={ButtonValsOne}/>
            </div>
            <div>
                <ButtonRow texts={ButtonTextTwo} onClick={onClick} values={ButtonValsTwo}/>
            </div>
            <div>
                <ButtonRow texts={ButtonTextThree} onClick={onClick} values={ButtonValsThree}/>
            </div>
        </div>
    );
}

export default Keyboard;