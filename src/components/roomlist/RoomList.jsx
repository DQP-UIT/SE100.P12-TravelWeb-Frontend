import React from "react";
import { FixedSizeList } from "react-window";
import RoomTag from "./RoomTag";

const RoomList = () => {
  const data = [];
  const Row = ({ index }) => {
    return <RoomTag room={data[index]} />;
  };
  return (
    <div>
      <FixedSizeList height={800} itemCount={10} itemSize={80}>
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default RoomList;
