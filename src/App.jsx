import { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import ScoreBoard from "./components/ScoreBoard/ScoreBoard.jsx";
import './App.css';

function App() {
    const [cards, setCards] = useState([]); // State to store the details of the pokemon cards
    const [currentScore, setCurrentScore] = useState(0); // State to track the current score
    const [bestScore, setBestScore] = useState(0); // State to track the best score
    const [clickedCards, setClickedCards] = useState({}); // State to track clicked cards

    // Effect for fetching Pokemon data on component mount
    useEffect(() => {
        const pokemonList = [
            'ditto', 'pikachu', 'bulbasaur', 'charmander', 'squirtle', 'eevee',
            'jigglypuff', 'meowth', 'psyduck', 'mankey', 'growlithe', 'geodude',
            'charizard', 'mewtwo', 'mew', 'gengar', 'blastoise', 'snorlax',
            'dragonite', 'articuno', 'zapdos'
        ];

        // Function to fetch data for a single Pokemon
        const fetchPokemonData = async (pokemonName) => {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
            const response = await fetch(url);
            const pokemonData = await response.json();
            return {
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokemonData.sprites.front_default
            };
        };

        // Function to fetch data for all Pokemon in the list
        const fetchAllPokemonData = async () => {
            try {
                const promises = pokemonList.map(pokemonName => fetchPokemonData(pokemonName));
                const pokemonDetails = await Promise.all(promises);
                setCards(shuffleArray(pokemonDetails)); // Shuffle the cards initially
            } catch (error) {
                console.error('Error fetching Pokemon data:', error);
            }
        };

        fetchAllPokemonData().catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    // Function to shuffle the array of cards
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // Function to handle card click events
    const handleCardClick = (card) => {
        if (clickedCards[card.id]) {
            setCurrentScore(0); // Reset the score if card has already been clicked
            setClickedCards({}); // Reset clicked cards
        } else {
            setCurrentScore(currentScore + 1); // Increment score
            setClickedCards({ ...clickedCards, [card.id]: true }); // Add card to clicked cards
            if (currentScore >= bestScore) {
                setBestScore(currentScore + 1); // Update best score
            }
        }
        setCards(shuffleArray(cards)); // Shuffle cards after each click
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Pokémon Memory Game</h1>
            </header>
            <ScoreBoard currentScore={currentScore} bestScore={bestScore} />
            <GameBoard cards={cards} onCardClick={handleCardClick} />
        </div>
    );
}

export default App;
