import PropTypes from 'prop-types';

function Menu({reset}) {
    return (
        <div className="menu">
            <div className="title">Wordle Unlimited</div>
            <div className="button-container">
                <button 
                    onClick={reset} 
                    className="new-game"
                    onKeyPress={(e) => { 
                        if (e.key === 'Enter' || e.key === 'Space' || e.key === ' ') {
                            e.preventDefault();
                        }
                    }}
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