import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getFavorites = async (token) => {
    const response = await axios.get(`${BASE_URL}/favorites`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const checkFavorite = async (gameId, token) => {
    const response = await axios.get(`${BASE_URL}/favorites/${gameId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data.isFavorite;
};

export const addToFavorites = async (gameId, token) => {
    await axios.post(`${BASE_URL}/favorites`, { game_id: gameId }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};

export const removeFromFavorites = async (gameId, token) => {
    await axios.delete(`${BASE_URL}/favorites/${gameId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
};
