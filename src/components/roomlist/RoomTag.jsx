import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const RoomTag = ({ room }) => {
  return (
    <div className="relative w-full min-w-fit max-w-2xl h-[250px] max-h-[260px] p-4 mb-6 bg-white shadow-md rounded-lg">
      <img
        className="absolute w-10 h-10 top-4 right-4 rounded-full border-2 border-white shadow-lg cursor-pointer"
        src={room.like}
        alt="Like"
      />
      <div className="w-full h-[240px] flex flex-col sm:flex-row">
        <div className="w-full sm:w-[215px] h-full bg-black/0 rounded-[5px] relative overflow-hidden">
          <Carousel
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            dynamicHeight={false}
            interval={3000}
            transitionTime={500}
            className="rounded-lg w-full h-[210px] max-h-[240px]"
          >
            {room.images.map((image, index) => (
              <div
                key={index}
                className="w-full h-[120px] max-h-[180px]  relative"
              >
                <img
                  className="w-full h-full object-fill rounded-lg"
                  src={image}
                  alt={`Room ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="max-w-[360px] flex-1 flex flex-col ml-0 sm:ml-4 mt-4 sm:mt-0">
          <div className="text-[#3e3f45] text-xl font-medium mb-2">
            {room.title}
          </div>
          <div className="text-[#4882e0] text-xs font-semibold mb-2">
            {room.location}
          </div>
          <div className="text-[#9fa7b5] text-[12.80px] font-semibold mb-4">
            {room.reviews} Nhận xét
          </div>
          <div className="text-[#7e8289] text-[12.90px] font-semibold mb-2">
            Nơi này có:
          </div>
          <div className="flex flex-wrap">
            {room.amenities.map((amenity, index) => (
              <div
                key={index}
                className="text-black text-[12.90px] font-semibold mr-4 mb-2"
              >
                {amenity}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTag;
