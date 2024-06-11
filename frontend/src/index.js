import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import Header from "./Pages/Header/Header";
import MainPage from "./Pages/MainPage"
import SearchResults from "./Pages/SearchResults";
import GamePage from "./Pages/GamePage"
import ErrorPage from "./Pages/ErrorPage";

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
                path: "games/:gameName",
                element: <GamePage/>,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
