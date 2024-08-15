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
