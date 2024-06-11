import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {searchGames} from '../Services/rawgService';
import {Button, Container, Image, ListGroup} from 'react-bootstrap';
import './SearchResults.css';

const fetchResults = async (query) => {
    try {
        return await searchGames(query);
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
};

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');
    const [results, setResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (query && query.length >= 2) {
            fetchResults(query)
                .then(data => setResults(data.results));
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
};

export default SearchResults;
