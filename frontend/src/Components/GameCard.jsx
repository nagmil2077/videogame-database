import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const GameCard = ({ game }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/games/${game.slug}`);
    };

    return (
        <Card className="game-card" onClick={handleClick} style={{ width: '18rem', margin: '1rem', cursor: "pointer" }}>
            <Card.Img variant="top" src={game.background_image} alt={game.name} />
            <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                    Genre: {game.genres.map(genre => genre.name).join(', ')}
                </Card.Text>
                <Card.Text>
                    Release Date: {new Date(game.released).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                    Developer: {game.developers ? game.developers.map(dev => dev.name).join(', ') : 'N/A'}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default GameCard;
