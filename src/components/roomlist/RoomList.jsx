import React from "react";
import { FixedSizeList } from 'react-window';
import RoomTag from "./RoomTag";
import { Link } from "react-router-dom";

const RoomList = ({list}) => {
  const Row = ({index}) => (
    <div>
      <Link to={'/detail'}>
        <RoomTag room={list[index]}/>
      </Link>
    </div>
  )
  return (
    <div>
      <FixedSizeList height={1000} itemCount={list.length} itemSize={500}>
        {Row}
      </FixedSizeList>
    </div>
  );
};

export default RoomList;
