import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const fetchGames = async (page = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/games`, {
            params: {
                page,
                page_size: pageSize,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};

export const searchGames = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                query,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching games:", error);
        throw error;
    }
};

export const fetchGameDetails = async (gameSlug) => {
    try {
        const response = await axios.get(`${BASE_URL}/games/${gameSlug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching game details:", error);
        throw error;
    }
};

export const fetchGameScreenshots = async (gameSlug) => {
    try {
        const response = await axios.get(`${BASE_URL}/games/${gameSlug}/screenshots`);
        return response.data;
    } catch (error) {
        console.error("Error fetching game screenshots:", error);
        throw error;
    }
};
