import PropTypes from 'prop-types'; // Import PropTypes
import Card from '../Card/Card.jsx'; // Import the Card component
import './GameBoard.css'; // Import the CSS for styling

function GameBoard({ cards, onCardClick }) {
    return (
        <div className="game-board">
            {cards.map((card, index) => (
                <Card
                    key={card.id || index}
                    name={card.name}
                    image={card.image}
                    onCardClick={() => onCardClick(card)}
                />
            ))}
        </div>
    );
}

// Define the prop types
GameBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Add PropTypes for id if you have it
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    })).isRequired,
    onCardClick: PropTypes.func.isRequired
};

export default GameBoard;
