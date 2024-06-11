import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGameDetails } from '../Services/rawgService';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import './GamePage.css'

const fetchDetails = async (gameName) => {
    try {
        return await fetchGameDetails(gameName);
    } catch (error) {
        console.error("Error fetching game details:", error);
    }
}

const GamePage = () => {
    const { gameName } = useParams();
    const [game, setGame] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetails(gameName)
            .then(data => setGame(data))
    }, [gameName]);

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="game-page">
            <Button variant="secondary" onClick={() => navigate('/')}>Back</Button>
            <Row className="mt-4">
                <Col md={4}>
                    <Image src={game.background_image} alt={game.name} fluid />
                </Col>
                <Col md={8}>
                    <h1>{game.name}</h1>
                    <p><strong>Release Date:</strong> {new Date(game.released).toLocaleDateString()}</p>
                    <p><strong>Genre:</strong> {game.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Developer:</strong> {game.developers.map(dev => dev.name).join(', ')}</p>
                    <p><strong>Description:</strong> {game.description_raw}</p>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col>
                    <iframe
                        width="100%"
                        height="500"
                        src={`https://www.youtube.com/embed/${game.clip?.video}`}
                        title="Game Trailer"
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                </Col>
            </Row>
        </Container>
    );
};

export default GamePage;
