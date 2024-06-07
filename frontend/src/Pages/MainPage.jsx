import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { fetchGames } from '../Services/igdbService';
import GameCard from '../Components/GameCard';

const MainPage = () => {
    const [games, setGames] = useState([]);
    const [offset, setOffset] = useState(0);
    const limit = 10;

    useEffect(() => {
        const getGames = async () => {
            try {
                const data = await fetchGames(offset, limit);
                setGames(data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };
        getGames();
    }, [offset]);

    const handleNextPage = () => {
        setOffset(offset + limit);
    };

    const handlePreviousPage = () => {
        setOffset(offset - limit);
    };

    return (
        <div className="MainPage">
            <h1>Welcome to VGDB</h1>
            <p>This is a video game database. Here you can find information about your favorite games.</p>
            <Container>
                <Row>
                    {games.map((game) => (
                        <Col key={game.id} sm={12} md={6} lg={4}>
                            <GameCard game={game} />
                        </Col>
                    ))}
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col xs="auto">
                        <Button onClick={handlePreviousPage} disabled={offset === 0}>
                            Previous
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button onClick={handleNextPage}>
                            Next
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default MainPage;
