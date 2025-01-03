import React from "react";
import { FixedSizeList } from "react-window";
import { useNavigate } from "react-router-dom";
import RoomTag from "./RoomTag";

const RoomList = ({ rooms = [] }) => {
  const navigate = useNavigate();

  const Row = ({ index, style }) => {
    const handleRoomClick = () => {
      navigate(`/detail/${rooms[index].id}`);
    };
  
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
            padding: "10px",
            marginBottom: "10px", // Khoảng cách bên trong mỗi room
            cursor: "pointer",
          }}
          onClick={handleRoomClick}
        >
          <RoomTag room={rooms[index]} />
        </div>
      </div>
    );
  };
  

  return (
    <div className="w-full h-[1500px]">
      <FixedSizeList
        height={1500}
        width={840}
        itemCount={rooms.length}
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
