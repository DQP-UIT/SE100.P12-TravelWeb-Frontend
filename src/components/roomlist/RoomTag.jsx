import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const RoomTag = ({ room }) => {
  return (
    <div className="w-[800px] h-[260px] relative p-4 bg-white shadow-md rounded-lg">
      <div className="flex mt-2">
        <div className="w-[320px] h-[200px] bg-black/0 rounded-[5px] relative">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            className="rounded-[5px]"
          >
            {room.images.map((image, index) => (
              <div key={index}>
                <img
                  className="rounded-[5px] object-fill"
                  src={image}
                  alt={`Room ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
          <img
            className="w-10 h-10 absolute top-4 right-4 rounded-full"
            src={room.avatar}
            alt="Avatar"
          />
        </div>
        <div className="flex-1 ml-4">
          <div className="text-[#3e3f45] text-xl font-medium font-['Inter'] mb-2">
            {room.title}
          </div>
          <div className="text-[#4882e0] text-xs font-semibold font-['Inter'] mb-2">
            {room.location}
          </div>
          <div className="text-[#9fa7b5] text-[12.80px] font-semibold font-['Inter'] mb-4">
            {room.reviews} Nhận xét
          </div>
          <div className="text-[#7e8289] text-[12.90px] font-semibold font-['Inter'] mb-2">
            Nơi này có:
          </div>
          <div className="flex flex-wrap">
            {room.amenities.map((amenity, index) => (
              <div
                key={index}
                className="text-black text-[12.90px] font-semibold font-['Inter'] mr-4 mb-2"
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
