import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel-custom.css"; 
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";

const RoomTag = ({ room }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="relative w-full min-w-fit max-w-3xl h-[260px] p-4 mb-6 bg-teal-50 shadow-lg rounded-lg">
      <div className="w-full h-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-[450px] h-full bg-black/0 rounded-[5px] relative overflow-hidden">
          <Carousel
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            dynamicHeight={false}
            interval={3000}
            transitionTime={500}
            className="rounded-lg w-full h-full"
          >
            {room.images.map((image, index) => (
              <div key={index} className="w-full h-full relative">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={image}
                  alt={`Room ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
          <div
            className="absolute z-10 w-10 h-10 top-2 right-7 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center bg-white"
            onClick={handleLikeClick}
          >
            {liked ? (
              <Favorite className="text-red-500" />
            ) : (
              <FavoriteBorder className="text-gray-500" />
            )}
          </div>
        </div>
        <div className="flex flex-row ml-4 max-w-2xl min-w-[330px]">
          <div className="flex-1">
            <div className="text-gray-900 text-xl font-semibold mb-2">
              {room.title}
            </div>
            <div className="text-gray-800 text-xs font-semibold mb-4 flex items-center">
              {room.reviews} Nhận xét
              <Rating
                name="read-only"
                value={room.overview}
                readOnly
                size="small"
                className="ml-2"
              />
            </div>
            <div className="text-blue-600 text-xs font-semibold mb-2">
              {room.location}
            </div>
          </div>
          <div className="flex-1 ml-2 mr-1">
            <div className="text-gray-800 text-lg font-semibold mb-2">
              Nơi này có:
            </div>
            <div className="flex flex-wrap">
              {room.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="text-black text-[12.90px] p-1 font-semibold mr-4 mb-2 bg-gray-200 rounded-lg"
                >
                  {amenity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTag;
