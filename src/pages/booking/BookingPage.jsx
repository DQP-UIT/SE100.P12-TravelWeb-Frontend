import React from "react";
import RoomBookingList from "./bookingComponent/RoomBookingList";
import RoomBookingTab from "./bookingComponent/RoomBookingTab";

const upcomingBookings = [
  {
    title: "Vinhomes Luxury Residence",
    location: "Binh Thanh, Ho Chi Minh City - cách điểm mốc 1.1 km",
    name: "Trần Phong",
    phone: "0961240000",
    orderDate: "00:00 - 01/11/2024",
    checkin: "13:00 - 05/11/2024",
    checkout: "17:00 - 05/11/2024",
    details: "1 phòng đôi, 1 phòng đơn",
    status: "Sắp tới",
    images: ["src/assets/react.svg", "src/assets/react.svg"],
  },{
    title: "Vinhomes Luxury Residence",
    location: "Binh Thanh, Ho Chi Minh City - cách điểm mốc 1.1 km",
    name: "Trần Phong",
    phone: "0961240000",
    orderDate: "00:00 - 01/11/2024",
    checkin: "13:00 - 05/11/2024",
    checkout: "17:00 - 05/11/2024",
    details: "1 phòng đôi, 1 phòng đơn",
    status: "Sắp tới",
    images: ["src/assets/react.svg", "src/assets/react.svg"],
  },{
    title: "Vinhomes Luxury Residence",
    location: "Binh Thanh, Ho Chi Minh City - cách điểm mốc 1.1 km",
    name: "Trần Phong",
    phone: "0961240000",
    orderDate: "00:00 - 01/11/2024",
    checkin: "13:00 - 05/11/2024",
    checkout: "17:00 - 05/11/2024",
    details: "1 phòng đôi, 1 phòng đơn",
    status: "Sắp tới",
    images: ["src/assets/react.svg", "src/assets/react.svg"],
  },
];

const completedBookings = [
  {
    title: "Cozy Studio Apartment",
    location: "District 1, Ho Chi Minh City - cách điểm mốc 0.5 km",
    name: "Nguyễn Văn B",
    phone: "0912345678",
    orderDate: "00:00 - 20/10/2024",
    checkin: "14:00 - 22/10/2024",
    checkout: "12:00 - 23/10/2024",
    details: "1 phòng đơn",
    status: "Hoàn tất",
    images: ["src/assets/react.svg"],
  },
];

const cancelledBookings = [];

const BookingPage = () => {
  return (
    <div className="w-full ">
      <RoomBookingTab
        upcomingBookings={upcomingBookings}
        completedBookings={completedBookings}
        cancelledBookings={cancelledBookings}
      />
    </div>
  );
};

export default BookingPage;
