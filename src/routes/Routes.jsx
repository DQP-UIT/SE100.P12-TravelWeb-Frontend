import { createBrowserRouter } from "react-router-dom";
import Default from "../components/default/Default";
import NotFound from "../pages/notfound/NotFound";
import Home from "../pages/home/Home";
import Search from "../pages/search/Search";
import OveralRoomSetting from "../pages/roomprovider/OveralRoomSetting";
import RoomSetting from "../pages/roomprovider/RoomSetting";
import BookingCalendar from "../pages/roomprovider/RoomCalendar";
import BookingPage from "../pages/booking/BookingPage";

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
    ],
  },
]);
