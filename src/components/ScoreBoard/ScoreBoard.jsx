import './ScoreBoard.css'; // Assuming you might have some styles specific to the scoreboard
import PropTypes from 'prop-types'; // Import PropTypes
function ScoreBoard({ currentScore, bestScore }) {
    return (
        <div className="scoreboard">
            <p>Current Score: {currentScore}</p>
            <p>Best Score: {bestScore}</p>
        </div>
    );
}

// Define the prop types
ScoreBoard.propTypes = {
    currentScore: PropTypes.number.isRequired,
    bestScore: PropTypes.number.isRequired
}
export default ScoreBoard;