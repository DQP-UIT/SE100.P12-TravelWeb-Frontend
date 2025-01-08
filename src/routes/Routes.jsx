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
import UserNew from "../views/pages/userNew/userNew";
import Service from "../views/components/service/Service";
import Room from "../views/components/room/Room";
import PaymentPage from "../views/pages/PaymentPage/PaymentPage";

import GPT from "../views/components/GPT/GPT";
import Admin2 from "../views/pages/Admin2/Admin2";
import SigninPage from "../views/pages/SigninPage/SigninPage";
import ProtectedRoute from "./ProtectedRoute";

// Router configuration
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
        isProtected: false,
      },
      {
        path: "gpt",
        element: <GPT />,
        isProtected: false,
      },
      {
        path: "search",
        element: <Search />,
        isProtected: false,
      },
      {
        path: "detail/:hotelId",
        element: <Detail />,
        isProtected: false,
      },
      {
        path: "login",
        element: <Login />,
        isProtected: false,
      },
      {
        path: "signup",
        element: <SigninPage />,
        isProtected: false,
      },
    ],
  },
  {
    path: "user/:id",
    element: (
      <ProtectedRoute allowedRoles={["Customer", "Admin", "Provider"]}>
        <UserNew />
      </ProtectedRoute>
    ),
    isProtected: true,
    allowedRoles: [["Customer", "Admin", "Provider"]],
    children: [
      { path: "", element: <Profile /> },
      { path: "profile", element: <Profile /> },
      { path: "overalset", element: <OveralRoomSetting /> },
      { path: "roomset", element: <RoomSetting /> },
      { path: "roomcalendar", element: <BookingCalendar /> },
      { path: "booking", element: <BookingPage /> },
      { path: "myorder", element: <PaymentCart /> },
      { path: "payment", element: <PaymentPage /> },
    ],
  },
  {
    path: "service/:id",
    element: (
      <ProtectedRoute allowedRoles={["Provider", "Admin"]}>
        <Service />
      </ProtectedRoute>
    ),
    isProtected: true,
    allowedRoles: ["Provider", "Admin"],
  },
  {
    path: "payment",
    element: (
      <ProtectedRoute allowedRoles={["Customer", "Provider"]}>
        <PaymentPage />
      </ProtectedRoute>
    ),
    isProtected: true,
    allowedRoles: ["Customer", "Provider"],
  },
  {
    path: "admin",
    element: (
      <ProtectedRoute allowedRoles={["Admin"]}>
        <Admin2 />
      </ProtectedRoute>
    ),
    isProtected: true,
    allowedRoles: ["Admin"],
    children: [
      { path: "customer", element: <CustomerMG /> },
      { path: "provider", element: <ProviderMG /> },
      { path: "main", element: <AdminMain /> },
      { path: "report", element: <RevenueReportPage /> },
    ],
  },
  {
    path: "room/:id",
    element: (
      <ProtectedRoute allowedRoles={["Provider", "Admin"]}>
        <Room />
      </ProtectedRoute>
    ),
    isProtected: true,
    allowedRoles: ["Provider", "Admin"],
  },
]);
