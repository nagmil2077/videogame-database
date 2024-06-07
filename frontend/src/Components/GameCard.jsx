import React from 'react';
import { Card } from 'react-bootstrap';

const GameCard = ({ game }) => {
    return (
        <Card style={{ width: '18rem', margin: '1rem' }}>
            <Card.Img variant="top" src={game.background_image} alt={game.name} />
            <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                    Genre: {game.genres.map(genre => genre.name).join(', ')}
                </Card.Text>
                <Card.Text>
                    Release Date: {game.released}
                </Card.Text>
                <Card.Text>
                    Developer: {game.developers ? game.developers.map(dev => dev.name).join(', ') : 'N/A'}
                </Card.Text>
                <Card.Text>
                    {game.description_raw ? `${game.description_raw.substring(0, 100)}...` : 'No description available.'}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default GameCard;
