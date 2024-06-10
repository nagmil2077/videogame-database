import React, { useState, useEffect } from 'react';
import { searchGames } from '../Services/rawgService';
import {Form, FormControl, Dropdown, Button} from 'react-bootstrap';
import './SearchField.css';

const SearchField = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (query.length >= 2) {
            const fetchResults = async () => {
                try {
                    const data = await searchGames(query);
                    setResults(data.results);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };
            fetchResults();
        } else {
            setResults([]);
        }
    }, [query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
        setDropdownOpen(true);
    };

    const handleBlur = () => {
        setTimeout(() => setDropdownOpen(false), 200); // Delay to allow click on dropdown items
    };

    const handleSearch = () => {
        if (query.length <= 2) {
            setDropdownOpen(true);
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
                            <Dropdown.Item key={game.id} className="search-result-item">
                                <img src={game.background_image} alt={game.name} className="search-result-thumbnail" />
                                <span className="search-result-name">{game.name}</span>
                                <span className="search-result-year">({new Date(game.released).getFullYear()})</span>
                            </Dropdown.Item>
                        ))
                    )};
                </Dropdown.Menu>
            )}
        </div>
    );
};

export default SearchField;
