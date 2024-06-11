import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchGameDetails, fetchGameScreenshots} from '../Services/rawgService';
import {Button, Col, Container, Image, Modal, Row} from 'react-bootstrap';
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

const GamePage = () => {
    const { gameName } = useParams();
    const [game, setGame] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedScreenshot, setSelectedScreenshot] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetails(gameName)
            .then(data => setGame(data));

        fetchScreenshots(gameName)
            .then(data => setScreenshots(data.results));
    }, [gameName]);

    const handleScreenshotClick = (screenshot) => {
        setSelectedScreenshot(screenshot);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedScreenshot(null);
    };

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
    );
};

export default GamePage;
