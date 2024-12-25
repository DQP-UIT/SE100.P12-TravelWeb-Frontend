import React from "react";
import { FixedSizeList } from "react-window";
import { useNavigate } from "react-router-dom";
import RoomTag from "./RoomTag";

const RoomList = ({ rooms = [] }) => {
  const navigate = useNavigate();

  const Row = ({ index, style }) => {
    const handleRoomClick = () => {
      navigate(`/detail/${rooms[index].id}`); // Chuyển hướng đến trang chi tiết với `id`
    };

    return (
      <div
        style={{ ...style, padding: "10px", cursor: "pointer" }}
        onClick={handleRoomClick}
      >
        <RoomTag room={rooms[index]} />
      </div>
    );
  };

  return (
    <div className="w-full h-[1500px]">
      <FixedSizeList
        height={800}
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
