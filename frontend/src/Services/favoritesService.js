import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

export const getFavorites = async () => {
    const token = localStorage.getItem('auth_token');
    const response = await axios.get(`${BASE_URL}/favorites`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
