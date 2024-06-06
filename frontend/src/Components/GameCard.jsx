import React from 'react';
import { Card } from 'react-bootstrap';

const GameCard = ({ game }) => {
    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {game.release_dates && game.release_dates[0] && new Date(game.release_dates[0].date * 1000).toLocaleDateString()}
                </Card.Subtitle>
                <Card.Text>
                    {game.summary}
                </Card.Text>
                <Card.Footer className="text-muted">
                    {game.involved_companies && game.involved_companies[0] && game.involved_companies[0].company.name}
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

export default GameCard;
