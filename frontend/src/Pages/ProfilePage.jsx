import {useContext} from "react";
import { AuthContext } from '../Contexts/AuthContext';
import {Button, Container} from "react-bootstrap";
import './FormPage.css';
import {Link} from "react-router-dom";

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="form-page-container">
            <h2 className="form-title">Welcome, {user.name}!</h2>
            <Container className="d-flex flex-column align-items-center">
                <Button variant="primary" className="my-2" size="lg">View Favorites</Button>
                <Button
                    variant="primary"
                    className="my-2" size="lg"
                    as={Link}
                    to="/profile/update">
                    Update Profile
                </Button>
                <Button variant="danger" className="my-2" size="lg">Delete Profile</Button>
            </Container>
        </div>
    );
};

export default ProfilePage;
