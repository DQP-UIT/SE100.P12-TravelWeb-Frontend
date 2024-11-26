import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";

const RoomTag = ({ room }) => {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <div className="relative w-full min-w-fit max-w-3xl h-[300px] p-4 mb-6 bg-white shadow-lg rounded-lg">
      <div className="w-full h-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-[300px] h-full bg-black/0 rounded-[5px] relative overflow-hidden">
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
            className="absolute z-10 w-10 h-10 top-4 right-7 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center bg-white"
            onClick={handleLikeClick}
          >
            {liked ? (
              <Favorite className="text-red-500" />
            ) : (
              <FavoriteBorder className="text-gray-500" />
            )}
          </div>
        </div>
        <div className="flex flex-row ml-2">
          <div className="flex-1">
            <div className="text-[#3e3f45] text-xl font-medium mb-2">
              {room.title}
            </div>
            <div className="text-[#9fa7b5] text-[12.80px] font-semibold mb-4 flex items-center">
              {room.reviews} Nhận xét
              <Rating
                name="read-only"
                value={room.overview}
                readOnly
                size="small"
                className="ml-2"
              />
            </div>
            <div className="text-[#4882e0] text-xs font-semibold mb-2">
              {room.location}
            </div>
          </div>
          <div className="flex-1">
            <div className="text-[#7e8289] text-[12.90px] font-semibold mb-2">
              Nơi này có:
            </div>
            <div className="flex flex-wrap">
              {room.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="text-black text-[12.90px] p-1 font-semibold mr-4 mb-2 bg-gray-400 rounded-lg"
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
