import axios from 'axios';

export const fetchGames = async (page = 1, pageSize = 10) => {
    try {
        const response = await axios.get(`/api/games`, {
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
        const response = await axios.get(`/api/games`, {
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
        const response = await axios.get(`/api/games/${gameSlug}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching game details:", error);
        throw error;
    }
};

export const fetchGameScreenshots = async (gameSlug) => {
    try {
        const response = await axios.get(`/api/games/${gameSlug}/screenshots`);
        return response.data;
    } catch (error) {
        console.error("Error fetching game screenshots:", error);
        throw error;
    }
};
