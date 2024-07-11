import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {searchGames} from '../Services/rawgService';
import {Button, Dropdown, Form, FormControl} from 'react-bootstrap';
import './SearchField.css';

const fetchResults = async (query) => {
    try {
        return await searchGames(query);
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
};

const SearchField = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (query.length >= 2) {
            fetchResults(query)
                .then(data => setResults(data.results));
        } else {
            setResults([]);
        }
    }, [query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
        setDropdownOpen(true);
    };

    const handleBlur = () => {
        setTimeout(() => setDropdownOpen(false), 200);
    };

    const handleSearch = () => {
        if (query.length < 2) {
            setDropdownOpen(true);
        } else if (query.length >= 2) {
            navigate(`/search?query=${query}`);
        }
    };

    return (
        <div className="search-field">
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setDropdownOpen(true)}
                    onBlur={handleBlur}
                />
                <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
            {dropdownOpen && (
                <Dropdown.Menu className="search-dropdown-menu" show>
                    {query.length < 2 ? (
                        <Dropdown.Item disabled>Please enter 2 or more characters</Dropdown.Item>
                    ) : (
                        results.map((game) => (
                            <Dropdown.Item
                                key={game.id}
                                className="search-result-item"
                                onClick={() => navigate(`/games/${game.slug}`)}
                            >
                                <img src={game.background_image} alt={game.name} className="search-result-thumbnail" />
                                <span className="search-result-name">{game.name}</span>
                                <span className="search-result-year">({new Date(game.released).getFullYear()})</span>
                            </Dropdown.Item>
                        ))
                    )}
                </Dropdown.Menu>
            )}
        </div>
    );
};

export default SearchField;
