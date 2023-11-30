import PropTypes from 'prop-types'; // Import PropTypes
import './Card.css';

function Card({ name, image, onCardClick }) {

    const handleClick = () => {
        if (onCardClick) {
            onCardClick(name);
        }
    };

    return (
        <div className="card" onClick={handleClick}>
            <img src={image} alt={name} className="card-image" />
            <p className="card-name">{name}</p>
        </div>
    );
}

// Define the prop types
Card.propTypes = {
    name: PropTypes.string.isRequired, // 'name' is a required string
    image: PropTypes.string.isRequired, // 'image' is a required string
    onCardClick: PropTypes.func.isRequired // 'onCardClick' is a required function
};

export default Card;
