import React from "react";
import { FixedSizeList } from 'react-window';
import RoomTag from "./RoomTag";
const RoomList = ({ rooms=[] }) => {
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
