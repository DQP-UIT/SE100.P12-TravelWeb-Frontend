import { createBrowserRouter } from "react-router-dom";
import Default from "../components/default/Default";
import NotFound from "../pages/notfound/NotFound";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import Detail from "../pages/detail/Detail";
import AccountLogin from "../pages/accountlogin/AccountLogin";
import SignUp from "../components/signup/SignUp";
import Login from "../components/login/Login";
import LoginOTP from "../components/loginotp/LoginOTP";
import LoginOTPNext from "../components/loginotp/LoginOTPnext";

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
            {
                path: 'detail',
                element: <Detail/>,
            },
            {
                path: 'account',
                element: <AccountLogin/>,
                children: [
                    {
                        path: 'signup',
                        element: <SignUp/>
                    },
                    {
                        path: 'login',
                        element: <Login/>,
                    },
                    {
                        path: 'login-otp',
                        children: [
                            {
                                path: '',
                                element: <LoginOTP/>,
                            },
                            {
                                path: 'next',
                                element: <LoginOTPNext/>
                            },
                        ],
                    },
                ]
            },
        ]
    },
])