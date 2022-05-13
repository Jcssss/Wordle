import PropTypes from 'prop-types';

function Menu({reset}) {
    return (
        <div className="menu">
            <div className="title">Wordle Unlimited</div>
            <div className="button-container">
                <button 
                    onMouseDown={reset} 
                    className="new-game"
                >
                    New Game
                </button>
            </div>
        </div>
    );
}

Menu.propTypes = {
    reset: PropTypes.func
}

export default Menu;