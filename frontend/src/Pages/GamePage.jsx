import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { fetchGameDetails } from '../Services/rawgService';
import './GamePage.css'

const fetchDetails = async (gameName) => {
    try {
        return await fetchGameDetails(gameName);
    } catch (error) {
        console.error("Error fetching game details:", error);
    }
}

const GamePage = () => {
    const { gameName } = useParams();
    const [game, setGame] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDetails(gameName)
            .then(data => setGame(data))
    }, [gameName]);


};

export default GamePage;
