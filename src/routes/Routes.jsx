import { createBrowserRouter } from "react-router-dom";
import Default from "../components/default/Default";
import Home from "../pages/Home/Home";
import Search from "../pages/search/Search";
import NotFound from "../pages/notfound/NotFound";

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