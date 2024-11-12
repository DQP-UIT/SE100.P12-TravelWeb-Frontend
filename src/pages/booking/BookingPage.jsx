import React from "react";
import RoomBookingList from "./bookingComponent/RoomBookingList";

const sampleBookings = [
  {
    title: "Vinhomes Luxury Residence at Binh Thanh - LUNA Landmark Apartment",
    location: "Bình Thạnh, Hồ Chí Minh",
    images: ["src/assets/react.svg", "src/assets/react.svg"],
    name: "Trần Phong",
    phone: "0961240000",
    orderDate: "00h00 04/11/2024",
    checkin: "13h00 05/11/2024",
    checkout: "17h00 05/11/2024",
    details: "1 phòng đôi, 1 phòng đơn",
    status: "Sắp tới",
  },
  {
    title: "Vinhomes Luxury Residence at Binh Thanh - LUNA Landmark Apartment",
    location: "Bình Thạnh, Hồ Chí Minh",
    images: ["src/assets/react.svg", "src/assets/react.svg"],
    name: "Trần Phong",
    phone: "0961240000",
    orderDate: "00h00 04/11/2024",
    checkin: "13h00 05/11/2024",
    checkout: "17h00 05/11/2024",
    details: "1 phòng đôi, 1 phòng đơn",
    status: "Sắp tới",
  },
  {
    title: "Vinhomes Luxury Residence at Binh Thanh - LUNA Landmark Apartment",
    location: "Bình Thạnh, Hồ Chí Minh",
    images: ["src/assets/react.svg", "src/assets/react.svg"],
    name: "Trần Phong",
    phone: "0961240000",
    orderDate: "00h00 04/11/2024",
    checkin: "13h00 05/11/2024",
    checkout: "17h00 05/11/2024",
    details: "1 phòng đôi, 1 phòng đơn",
    status: "Sắp tới",
  },
];
const BookingPage = () => {
  return (
    <div className="w-full ">
      <RoomBookingList bookings={sampleBookings} />
    </div>
  );
};

export default BookingPage;
