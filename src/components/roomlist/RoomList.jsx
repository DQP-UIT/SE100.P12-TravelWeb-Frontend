import React from "react";
import { FixedSizeList } from 'react-window';
import RoomTag from "./RoomTag";
import { Link } from "react-router-dom";

const RoomList = ({ rooms }) => {
  // Render từng RoomTag dựa trên chỉ số trong mảng
  const Row = ({ index, style }) => {
    return (
      <div style={style}>
        <RoomTag room={rooms[index]} />
      </div>
    );
  };

  return (
    <div className="w-full h-[1500px]">
      <FixedSizeList
        height={760}
        width={800}
        itemCount={rooms.length}
        itemSize={280}
        style={{
          overflowX: "hidden", // Ẩn thanh cuộn ngang
          scrollbarWidth: "none", // Ẩn thanh cuộn trên Firefox
        }}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default RoomList;
