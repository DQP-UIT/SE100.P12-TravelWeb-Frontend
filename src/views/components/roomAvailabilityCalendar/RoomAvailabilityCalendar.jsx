import React, { useState, useEffect } from "react";
import { Calendar, InputNumber, Badge, Button, message, Typography } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  clearRoomErrors,
  getRoomById,
  updateRoomAvailable,
} from "../../../viewModel/roomActions";

const { Title } = Typography;

const RoomAvailabilityCalendar = ({ roomID }) => {
  const dispatch = useDispatch();
  const { room, loading, error } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getRoomById(roomID));

    return () => {
      dispatch(clearRoomErrors());
    };
  }, [dispatch, roomID]);

  const initializeData = () => {
    const initialRooms = {};
    room.roomsAvailable?.forEach((item) => {
      const dateOnly = item.date.split("T")[0];
      initialRooms[dateOnly] = item.availableRooms;
    });
    return initialRooms;
  };

  const [roomsData, setRoomsData] = useState({});

  useEffect(() => {
    setRoomsData(initializeData());
  }, [room]);

  const updateRooms = (date, value) => {
    setRoomsData((prev) => ({
      ...prev,
      [date]: value || 0,
    }));
  };

  const dateCellRender = (value) => {
    const today = moment();
    const dateKey = value.format("YYYY-MM-DD");
    const availableRooms = roomsData[dateKey] || 0;

    if (value.isBefore(today, "day")) {
      return null;
    }

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Badge
          count={`Trống:`}
          style={{
            backgroundColor: availableRooms > 0 ? "#52c41a" : "#f5222d",
          }}
        />
        <InputNumber
          min={0}
          placeholder="Số phòng"
          value={availableRooms}
          onChange={(value) => updateRooms(dateKey, value)}
          style={{
            width: "30%",
            marginLeft: "8px",
          }}
        />
      </div>
    );
  };

  const disabledDate = (current) => {
    return current && current.isBefore(moment(), "day");
  };

  const handleSave = async () => {
    const updatedRoomData = {
      ...room,
      roomsAvailable: Object.entries(roomsData).map(([date, availableRooms]) => ({
        date: `${date}T00:00:00.000Z`,
        availableRooms,
      })),
    };

    try {
      await dispatch(updateRoomAvailable(roomID, updatedRoomData));
      message.success("Cập nhật phòng thành công!");
      dispatch(getRoomById(roomID));
    } catch (error) {
      message.error("Cập nhật phòng thất bại!");
    }
  };
console.log("R",room)
  return (
    <div>
      <Title level={4}>{ room?.roomType ? room?.roomType : "Vui lòng chọn loại phòng"}</Title>
      {room?.roomType && (
        <div>
        <Button type="primary" style={{ width: "100px" }} onClick={handleSave} loading={loading}>
        Lưu
      </Button>
      <Calendar
        dateCellRender={dateCellRender}
        disabledDate={disabledDate}
        fullscreen={false}
      />
      </div>
  
      
      )}
      </div>
  );
};

export default RoomAvailabilityCalendar;
