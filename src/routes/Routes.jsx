import { createBrowserRouter } from "react-router-dom";
import Default from "../components/default/Default";
import NotFound from "../pages/notfound/NotFound";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import OveralRoomSetting from "../pages/roomprovider/OveralRoomSetting";
import RoomSetting from "../pages/roomprovider/RoomSetting";
import BookingCalendar from "../pages/roomprovider/RoomCalendar";
import BookingPage from "../pages/booking/BookingPage";
import PaymentCart from "../pages/booking/PaymentCart";
import AdminSet from "../components/default/AdminSet";
import CustomerMG from "../pages/admin/CustomerMG";
import CustomerInfo from "../pages/admin/CustomerInfo";
import ProviderMG from "../pages/admin/ProviderMG";
import ProviderInfo from "../pages/admin/ProviderInfo";
import AdminMain from "../pages/admin/AdminMain";
import PaymentPage from "../pages/booking/PaymentPage";
import RevenueReportPage from "../pages/admin/report/RevenueReport";

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
        path: "/overalset",
        element: <OveralRoomSetting />,
      },
      {
        path: "/roomset",
        element: <RoomSetting />,
      },
      {
        path: "/roomcalendar",
        element: <BookingCalendar />,
      },
      {
        path: "/booking",
        element: <BookingPage />,
      },
      {
        path: "/myorder",
        element: <PaymentCart />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminSet />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/admin/",
        element: <AdminMain />,
      },
      {
        path: "/admin/customer",
        element: <CustomerMG />,
      },
      {
        path: "/admin/customerinfo",
        element: <CustomerInfo />,
      },
      {
        path: "/admin/provider",
        element: <ProviderMG />,
      },
      {
        path: "/admin/providerinfo",
        element: <ProviderInfo />,
      },
      {
        path: "/admin/revenue",
        element: <RevenueReportPage />,
      },
    ],
  },
]);
