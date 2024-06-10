import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchGames } from '../Services/rawgService';
import {Container, ListGroup, Image, Button} from 'react-bootstrap';
import './SearchResults.css';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (query && query.length >= 2) {
            const fetchResults = async () => {
                try {
                    const data = await searchGames(query);
                    setResults(data.results);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };
            fetchResults();
        }
    }, [query]);

    return (
        <Container>
            <h2>Search Results for "{query}"</h2>
            <ListGroup>
                {results.map(game => (
                    <ListGroup.Item key={game.id} className="search-result-item">
                        <Image src={game.background_image} alt={game.name} className="search-result-thumbnail" />
                        <div className="search-result-details">
                            <span className="search-result-name">{game.name}</span>
                            <span className="search-result-year">({new Date(game.released).getFullYear()})</span>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <br/>
            <Button variant="primary" onClick={() => navigate("/")}>Back to Main Page</Button>
        </Container>
    );
}

export default SearchResults;
