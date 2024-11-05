import React from "react";
import RoomTag from "./RoomTag";

const roomData = {
  images: [
    "https://via.placeholder.com/273x193",
    "https://via.placeholder.com/273x193/0000FF",
    "https://via.placeholder.com/273x193/008000",
  ],
  avatar: "https://via.placeholder.com/40x40",
  title: "Vinhomes Luxury Residence at Binh Thanh - LUNA Landmark Apartment",
  location: "Binh Thanh, Ho Chí Minh - cách điểm mốc 1,1 km",
  reviews: 124,
  amenities: [
    "Free wifi",
    "Máy chạy bộ",
    "Cho thuê oto",
    "Trà chiều",
    "Free bữa sáng",
  ],
};

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <RoomTag room={roomData} />
    </div>
  );
};

export default App;
