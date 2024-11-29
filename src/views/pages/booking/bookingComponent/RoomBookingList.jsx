import React from "react";
import { FixedSizeList } from "react-window";
import RoomBookingTag from "./RoomBookingTag";

const RoomBookingList = ({ bookings }) => {
  const Row = ({ index, style }) => {
    return (
      <div style={style}>
        <RoomBookingTag booking={bookings[index]} />
      </div>
    );
  };

  return (
    <div>
      <FixedSizeList
        height={1200}
        itemCount={bookings.length}
        itemSize={280} // Adjusted size for each RoomBookingTag
        width={980}
      >
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default RoomBookingList;
