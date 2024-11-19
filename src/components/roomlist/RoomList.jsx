import React from "react";
import { FixedSizeList } from 'react-window';
import RoomTag from "./RoomTag";
import SearchBar from "../searchbar/SearchBar";

const RoomList = ({list}) => {
  const Row = ({index}) => (
    <div>
      <RoomTag room={list[index]}/>
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
