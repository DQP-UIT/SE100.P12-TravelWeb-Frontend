import React from "react";
import RoomSetBox from "./room_component/RoomSetBox";
import PolicyBox from "./room_component/PolicyBox";
import ServiceBox from "./room_component/ServiceBox";

const RoomSetting = () => {
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-10">
        <div>
          {" "}
          <h1 className="text-black text-2xl font-semibold">Thiết Lập Phòng</h1>
        </div>
        <div className="row-start-2">
          <span>Tổng số phòng được kích hoạt: </span>
        </div>
        <div className="col-start-4 row-start-2 relative">
          <button
            title="Thêm Phòng"
            className="w-40 h-12 absolute right-6 bg-blue-500 rounded-lg text-center text-white text-xl font-normal hover:scale-110"
          >
            Thêm Phòng
          </button>
        </div>
      </div>
      <RoomSetBox />
      <div className="mt-6 mb-6 w-full grid place-content-center">
        <span className="w-fit text-2xl font-semibold">Chính Sách Đổi Trả</span>
      </div>
      <PolicyBox />
      <div className="mt-6 mb-6 w-full grid place-content-center">
        <span className="w-fit text-2xl font-semibold">Dịch Vụ</span>
      </div>
      <ServiceBox />
    </div>
  );
};

export default RoomSetting;
