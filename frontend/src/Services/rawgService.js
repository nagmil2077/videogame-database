import axios from 'axios';

const API_KEY = '63c6aaa2e6ac4ba3a87cb42f3d421cd9';
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async (page = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/games`, {
            params: {
                key: API_KEY,
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
    if (query.length < 2) {
        return { results: [] };
    }

    try {
        const response = await axios.get(`${BASE_URL}/games`, {
            params: {
                key: API_KEY,
                search: query,
                page_size: 10,
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
        const response = await axios.get(`${BASE_URL}/games/${gameSlug}`, {
            params: {
                key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching game details:", error);
        throw error;
    }
};

export const fetchGameScreenshots = async (gameSlug) => {
    try {
        const response = await axios.get(`${BASE_URL}/games/${gameSlug}/screenshots`, {
            params: {
                key: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching game screenshots:", error);
        throw error;
    }
};
