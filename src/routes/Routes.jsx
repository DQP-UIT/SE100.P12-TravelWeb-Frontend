import { createBrowserRouter } from "react-router-dom";
import Default from "../components/default/Default";
import NotFound from "../pages/notfound/NotFound";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Default/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: 'search',
                element: <Search/>,
            },
        ]
    },
])