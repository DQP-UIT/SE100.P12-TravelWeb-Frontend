import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import DefaultComponent from "../components/DefaultComponent/DefaultComponent";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultComponent/>,
        errorElement: <NotFoundPage/>,
        children: [
            {
                path: '/',
                element: <HomePage/>,
            },
            {
                path: 'search',
                element: <SearchPage/>,
            },
        ]
    },
])