import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import Header from "./Pages/Header/Header";
import MainPage from "./Pages/MainPage";
import SearchResults from "./Pages/SearchResults";
import GamePage from "./Pages/GamePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ErrorPage from "./Pages/ErrorPage";
import ProfilePage from "./Pages/ProfilePage";
import UpdateProfilePage from './Pages/UpdateProfilePage';
import {AuthProvider} from './Contexts/AuthContext';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Header/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <MainPage/>,
            },
            {
                path: "/search",
                element: <SearchResults/>,
            },
            {
                path: "/games/:gameName",
                element: <GamePage/>,
            },
            {
                path: "/register",
                element: <RegisterPage/>,
            },
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/profile/update",
                element: <UpdateProfilePage />,
            }
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
