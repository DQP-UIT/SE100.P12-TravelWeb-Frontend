import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const RoomSetBox = () => {
  const [expandedRoom, setExpandedRoom] = useState(null);

  const toggleRoom = (id) => {
    setExpandedRoom((prev) => (prev === id ? null : id));
  };

  // Fake data to simulate API call
  const fakeRooms = [
    {
      id: 1,
      roomNumber: "404404",
      person: 2,
      photos: 0,
      basicInfo: {
        roomName: "Deluxe Room",
        internalName: "Deluxe Room Internal",
        linkCode: "DLX123",
        roomCount: 5,
        minPrice: 1000000,
      },
      guestSettings: {
        occupancy: 2,
        beds: 1,
        allowKids: "yes",
        freeForKids: 0,
      },
      content: {
        totalPhotos: 0,
        roomArea: 30,
        direction: "East",
        amenities: "Yes",
        bed: "Yes",
        bathrooms: 1,
      },
    },
    // Add more rooms as needed
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-white shadow-md rounded-lg">
      {fakeRooms.map((room) => (
        <div key={room.id} className="mb-4">
          {/* Room Dropdown Header */}
          <Box
            className="flex flex-row items-center justify-between bg-blue-500 p-4 rounded-lg text-white text-center text-xl font-bold cursor-pointer"
            onClick={() => toggleRoom(room.id)}
          >
            <IconButton>
              {expandedRoom === room.id ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
            <Box className="flex justify-between w-full">
              <span>{room.roomNumber}</span>
              <span>Person: {room.person}</span>
              <span>Photos: {room.photos}</span>
            </Box>
          </Box>

          {/* Expanded Room Details */}
          {expandedRoom === room.id && (
            <Box className="p-4 bg-zinc-300/50 shadow rounded-b-lg">
              <Box className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Thông tin cơ bản */}
                <Box className="flex flex-col space-y-4">
                  <Typography variant="h6" className="text-black">
                    Thông tin cơ bản
                  </Typography>
                  <Box className="flex flex-col">
                    <label className="text-black">
                      Tên phòng <span className="text-red-600">*</span>:
                    </label>
                    <input
                      type="text"
                      value={room.basicInfo.roomName}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    />
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">
                      Tên phòng nội bộ (không hiển thị với khách):
                    </label>
                    <input
                      type="text"
                      value={room.basicInfo.internalName}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    />
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">Mã liên kết:</label>
                    <input
                      type="text"
                      value={room.basicInfo.linkCode}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    />
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">
                      Số lượng phòng <span className="text-red-600">*</span>:
                    </label>
                    <input
                      type="number"
                      value={room.basicInfo.roomCount}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    />
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">
                      Giá tối thiểu <span className="text-red-600">*</span>:
                    </label>
                    <Box className="flex items-center">
                      <input
                        type="number"
                        value={room.basicInfo.minPrice}
                        className="p-2 bg-zinc-100 rounded border border-black/60 flex-grow"
                      />
                      <span className="ml-2 text-black">VND</span>
                    </Box>
                  </Box>
                </Box>

                {/* Cài đặt số lượng khách */}
                <Box className="flex flex-col space-y-4">
                  <Typography variant="h6" className="text-black">
                    Cài đặt số lượng khách
                  </Typography>
                  <Box className="flex flex-col">
                    <label className="text-black">Room occupancy:</label>
                    <input
                      type="number"
                      value={room.guestSettings.occupancy}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    />
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">Giường:</label>
                    <input
                      type="number"
                      value={room.guestSettings.beds}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    />
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">Allow kids:</label>
                    <select
                      value={room.guestSettings.allowKids}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">
                      Free for kids (up to 12 years old):
                    </label>
                    <input
                      type="number"
                      value={room.guestSettings.freeForKids}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    />
                  </Box>
                  <Box className="flex flex-col">
                    <span className="text-black">
                      Tổng số khách được phép ở trong phòng:
                    </span>
                    <span className="ml-2">2 x 👤 + 1 x 🛏️ + 0 x 👶 = 2</span>
                  </Box>
                </Box>

                {/* Nội dung */}
                <Box className="flex flex-col space-y-4">
                  <Typography variant="h6" className="text-black">
                    Nội dung
                  </Typography>
                  <Box className="flex flex-col">
                    <label className="text-black">Tổng số ảnh:</label>
                    <button className="p-2 bg-blue-500 text-white rounded">
                      Tải ảnh
                    </button>
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">Diện tích phòng (m2):</label>
                    <input
                      type="number"
                      value={room.content.roomArea}
                      min={5}
                      placeholder="Ít nhất 5(m2)"
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    />
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">Hướng:</label>
                    <select
                      value={room.content.direction}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    >
                      <option>Vui lòng chọn</option>
                      <option>Đông</option>
                      <option>Tây</option>
                      <option>Nam</option>
                      <option>Bắc</option>
                    </select>
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">Tiện nghi:</label>
                    <select
                      value={room.content.amenities}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    >
                      <option>Vui lòng chọn</option>
                      <option>Có</option>
                      <option>Không</option>
                    </select>
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">Giường:</label>
                    <select
                      value={room.content.bed}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    >
                      <option>Vui lòng chọn</option>
                      <option>Có</option>
                      <option>Không</option>
                    </select>
                  </Box>
                  <Box className="flex flex-col">
                    <label className="text-black">Số phòng tắm:</label>
                    <input
                      type="number"
                      value={room.content.bathrooms}
                      className="p-2 bg-zinc-100 rounded border border-black/60"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </div>
      ))}
    </div>
  );
};

export default RoomSetBox;
