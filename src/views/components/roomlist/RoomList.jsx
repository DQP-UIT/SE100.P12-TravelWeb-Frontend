import React, { useEffect } from "react";
import { FixedSizeList } from "react-window";
import { useNavigate } from "react-router-dom";
import RoomTag from "./RoomTag";
import { fetchLoveList } from "../../../model/loveListSlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";

const RoomList = ({ rooms = [] }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  let decodedToken = {};
  if (token) {
    decodedToken = jwtDecode(token);
  } else {
    console.log("Không có token để giải mã.");
  }

  const { loveList, status, error } = useSelector((state) => state.loveList);

  useEffect(() => {
    dispatch(fetchLoveList(decodedToken.userID));
  }, [dispatch]);

  const Row = ({ index, style }) => {
    return (
      <div
        style={{
          ...style,
          top: `${parseFloat(style.top) + 10}px`, // Thêm khoảng cách giữa các room
          height: `${parseFloat(style.height) - 10}px`, // Điều chỉnh chiều cao của mỗi mục
        }}
      >
        <div
          className="room-wrapper"
          style={{
           
           
            cursor: "pointer",
          }}
        >
          <RoomTag room={rooms[index]} userID={decodedToken.userID} />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[1500px]">
      <FixedSizeList
        height={1500}
        width={840}
        itemCount={Math.min(rooms.length, 8)} // Ensure no more than 10 rooms are shown
        itemSize={280}
        style={{
          overflowX: "hidden",
          scrollbarWidth: "none",
        }}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default RoomList;
