import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const RoomBookingTag = ({ booking }) => {
  return (
    <div className="relative w-full h-[250px] max-h-[280px] min-w-fit max-w-2xl p-6 bg-[#e4f7fd] shadow-md rounded-lg flex">
      <div className="w-full h-full flex flex-col sm:flex-row relative">
        {/* Image Carousel */}
        <div className="w-full sm:w-[215px] h-full bg-gray-200 rounded-lg overflow-hidden">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            autoPlay={true}
            dynamicHeight={false}
            interval={3000}
            transitionTime={500}
            className="rounded-lg w-full h-full"
          >
            {booking.images.map((image, index) => (
              <div key={index} className="w-full h-full">
                <img
                  className="object-fill w-full h-full rounded-lg"
                  src={image}
                  alt={`Room ${index + 1}`}
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Booking Info */}
        <div className="flex-1 ml-6 w-[600px] max-w-2xl">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="text-[#3e3f45] text-lg font-medium font-['Inter'] mb-1">
                {booking.title}
              </div>
              <div className="text-[#4882e0] text-sm font-semibold font-['Inter']">
                {booking.location}
              </div>
            </div>
            <div className="text-yellow-500 min-w-20 text-sm text-center font-bold bg-[#ffefc0] rounded-md px-2 py-1">
              {booking.status}
            </div>
          </div>

          <div className="text-[#7e8289] text-sm font-semibold font-['Inter'] mb-1">
            <p>Họ tên: {booking.name}</p>
            <p>Số điện thoại: {booking.phone}</p>
            <p>Ngày đặt: {booking.orderDate}</p>
          </div>

          <div className="text-[#7e8289] text-sm font-semibold font-['Inter'] mb-2">
            <p>Checkin: {booking.checkin}</p>
            <p>Checkout: {booking.checkout}</p>
            <p>Chi tiết đặt: {booking.details}</p>
          </div>

          {/* Button */}
          <div className="absolute bottom-6 right-0">
            <button className="px-6 py-2 bg-[#2c89f0] text-white rounded-lg hover:scale-105">
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomBookingTag;
