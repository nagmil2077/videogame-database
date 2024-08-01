import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchGameDetails, fetchGameScreenshots} from '../Services/rawgService';
import {Button, Col, Container, Image, Modal, Row} from 'react-bootstrap';
import axios from 'axios';
import './GamePage.css';

const fetchDetails = async (gameName) => {
    try {
        return await fetchGameDetails(gameName);
    } catch (error) {
        console.error("Error fetching game details:", error);
    }
};

const fetchScreenshots = async (gameName) => {
    try {
        return await fetchGameScreenshots(gameName);
    } catch (error) {
        console.error("Error fetching game screenshots:", error);
    }
};

const checkIfFavorite = async (gameId, token) => {
    try {
        const response = await axios.get(`http://localhost:8000/api/favorites/${gameId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.isFavorite;
    } catch (error) {
        console.error("Error checking favorite status:", error);
        return false;
    }
};

const GamePage = () => {
    const { gameName } = useParams();
    const [game, setGame] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedScreenshot, setSelectedScreenshot] = useState(null);
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem('auth_token'));

    useEffect(() => {
        fetchDetails(gameName)
            .then(data => setGame(data));

        fetchScreenshots(gameName)
            .then(data => setScreenshots(data.results));
    }, [gameName]);

    useEffect(() => {
        if (game && token) {
            checkIfFavorite(game.id, token).then(setIsFavorite);
        }
    }, [game, token]);

    const handleScreenshotClick = (screenshot) => {
        setSelectedScreenshot(screenshot);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedScreenshot(null);
    };

    const handleAddToFavorites = async () => {
        if (!token) return;
        try {
            await axios.post('http://localhost:8000/api/favorites', { game_id: game.id }, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            setIsFavorite(true);
        } catch (error) {
            console.error('Error adding to favorites:', error);
        }
    };

    const handleRemoveFromFavorites = async () => {
        if (!token) return;
        if (window.confirm("Are you sure you want to remove this game from your favorites?")) {
            try {
                await axios.delete(`http://localhost:8000/api/favorites/${game.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsFavorite(false);
            } catch (error) {
                console.error('Error removing from favorites:', error);
            }
        }
    };

    if (!game) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-page">
            <Container className="game-page-container">
                <Button variant="secondary" onClick={() => navigate('/')}>Back to Main Page</Button>
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
                        {token && (
                            <Button
                                variant={isFavorite ? "danger" : "primary"}
                                onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
                            >
                                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                            </Button>
                        )}
                    </Col>
                </Row>
                <Row className="mt-4">
                    {screenshots.map((screenshot) => (
                        <Col md={3} key={screenshot.id}>
                            <Image
                                src={screenshot.image}
                                alt={`Screenshot ${screenshot.id}`}
                                thumbnail
                                onClick={() => handleScreenshotClick(screenshot.image)}
                                className="game-screenshot"
                            />
                        </Col>
                    ))}
                </Row>

                <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Screenshot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Image src={selectedScreenshot} alt="Full-size screenshot" fluid />
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    );
};

export default GamePage;
