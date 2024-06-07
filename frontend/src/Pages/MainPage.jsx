import React, { useEffect, useState } from 'react';
import { fetchGames } from '../Services/rawgService';
import GameCard from '../Components/GameCard';
import { Container, Row, Col, Pagination } from 'react-bootstrap';

const MainPage = () => {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        const loadGames = async () => {
            try {
                const data = await fetchGames(currentPage, pageSize);
                setGames(data.results);
            } catch (error) {
                console.error("Error loading games:", error);
            }
        };
        loadGames();
    }, [currentPage, pageSize]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="main-page">
            <Container>
                <div className="welcome-section text-center">
                    <h1 className="display-4">Welcome to VGDB</h1>
                    <p className="lead">Your ultimate video game database. Discover and explore new games every day!</p>
                </div>
                <Row>
                    {games.map(game => (
                        <Col key={game.id} xs={12} sm={6} md={4} lg={3}>
                            <GameCard game={game} />
                        </Col>
                    ))}
                </Row>
                <Pagination>
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    <Pagination.Item active>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
                </Pagination>
            </Container>
        </div>
    )
}

export default MainPage;
