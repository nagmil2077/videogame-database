import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getFavorites} from "../Services/favoritesService";
import { Button, Container, Image, ListGroup } from 'react-bootstrap';
import './FavoritesPage.css';

const fetchFavorites = async () => {
    try {
        return await getFavorites();
    } catch (error) {
        console.error("Error fetching favorite games:", error);
    }
};

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchFavorites()
            .then(data => setFavorites(data.favorites));
    }, []);

    return (
        <div className="favorites-page">
            <Container>
                <h2>Your Favorite Games</h2>
                <ListGroup>
                    {favorites.map(game => (
                        <ListGroup.Item key={game.id} className="favorite-item">
                            <Image src={game.background_image} alt={game.name} className="favorite-thumbnail"/>
                            <div className="favorite-details">
                                <span
                                    className="favorite-name"
                                    onClick={() => navigate(`/games/${game.slug}`)}>{game.name}
                                </span>
                                <span className="favorite-year">({new Date(game.released).getFullYear()})</span>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <br/>
                <Button variant="secondary" onClick={() => navigate("/profile")}>Back to Profile Page</Button>
                <Button variant="secondary" onClick={() => navigate("/")}>Back to Main Page</Button>
            </Container>
        </div>
    );
}

export default FavoritesPage;
