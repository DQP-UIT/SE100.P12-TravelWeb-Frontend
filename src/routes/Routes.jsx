import { createBrowserRouter } from "react-router-dom";
import Default from "../views/components/default/Default";
import NotFound from "../views/pages/notfound/NotFound";
import Home from "../views/pages/home/Home";
import Search from "../views/pages/search/Search";
import OveralRoomSetting from "../views/pages/roomprovider/OveralRoomSetting";
import RoomSetting from "../views/pages/roomprovider/RoomSetting";
import BookingCalendar from "../views/pages/roomprovider/RoomCalendar";
import BookingPage from "../views/pages/booking/BookingPage";
import PaymentCart from "../views/pages/booking/PaymentCart";
import AdminSet from "../views/components/default/AdminSet";
import CustomerMG from "../views/pages/admin/CustomerMG";
import ProviderMG from "../views/pages/admin/ProviderMG";
import AdminMain from "../views/pages/admin/AdminMain";

import RevenueReportPage from "../views/pages/admin/report/RevenueReport";
import Detail from "../views/pages/detail/Detail";
import AccountLogin from "../views/pages/accountlogin/AccountLogin";
import SignUp from "../views/components/signup/SignUp";
import Login from "../views/components/login/Login";
import LoginOTP from "../views/components/loginotp/LoginOTP";
import LoginOTPNext from "../views/components/loginotp/LoginOTPnext";
import User from "../views/pages/user/User";
import Profile from "../views/components/profile/Profile";
import UserNew from "../views/pages/userNew/userNew"
import Service from "../views/components/service/Service";
import Room from "../views/components/room/Room";
import PaymentPage from "../views/pages/PaymentPage/PaymentPage"
import Admin2 from "../views/pages/Admin2/Admin2"
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "detail/:hotelId", // Thêm tham số động ":id"
        element: <Detail />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "account",
        element: <Default />,
        children: [
          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "login-otp",
            children: [
              {
                path: "",
                element: <LoginOTP />,
              },
              {
                path: "next",
                element: <LoginOTPNext />,
              },
            ],
          },
        ],
      },
      
    ],
  },
  {
      path:  "user/:id",
      element: <UserNew />,
      children: [
        {
          path: "",
          element: <Profile />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "overalset",
          element: <OveralRoomSetting />,
        },
        {
          path: "roomset",
          element: <RoomSetting />,
        },
        {
          path: "roomcalendar",
          element: <BookingCalendar />,
        },
        {
          path: "booking",
          element: <BookingPage />,
        },
        {
          path: "myorder",
          element: <PaymentCart />,
        },
        {
          path: "payment",
          element: <PaymentPage />,
        },
      ],
    
  },
  
  {
    
    path:  "service/:id",
    element: <Service />,
  },
  {
    
    path:  "payment",
    element: <PaymentPage />,
  },
  {
    
    path:  "admin",
    element: <Admin2 />,
  },
  {
    
    path:  "room/:id",
    element: <Room />,
  },
  // {
  //   path: "/admin",
  //   element: <AdminSet />,
  //   errorElement: <NotFound />,
  //   children: [
  //     {
  //       path: "/admin/",
  //       element: <AdminMain />,
  //     },
  //     // {
  //     //   path: "/admin/customer",
  //     //   element: <CustomerMG />,
  //     // },
  //     // {
  //     //   path: "/admin/customerinfo",
  //     //   element: <CustomerInfo />,
  //     // },
  //     // {
  //     //   path: "/admin/provider",
  //     //   element: <ProviderMG />,
  //     // },
  //     // {
  //     //   path: "/admin/providerinfo",
  //     //   element: <ProviderInfo />,
  //     // },
  //     // {
  //     //   path: "/admin/revenue",
  //     //   element: <RevenueReportPage />,
  //     // },
  //   ],
  // },
]);
