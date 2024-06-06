import axios from 'axios';

const API_URL = 'https://api.igdb.com/v4/games';
const CLIENT_ID = process.env.REACT_APP_IGDB_CLIENT_ID;
const ACCESS_TOKEN = process.env.REACT_APP_IGDB_ACCESS_TOKEN;

export const fetchGames = async (offset = 0, limit = 10) => {
    try {
        const response = await axios.post(
            API_URL,
            `fields name, release_dates.date, involved_companies.company.name, summary; limit ${limit}; offset ${offset};`,
            {
                headers: {
                    'Client-ID': CLIENT_ID,
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'text/plain',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching games:', error);
        throw error;
    }
};
