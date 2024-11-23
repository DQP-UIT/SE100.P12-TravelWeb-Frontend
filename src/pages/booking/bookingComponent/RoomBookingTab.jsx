import React, { useState } from "react";
import RoomBookingTag from "./RoomBookingTag";
import { Tabs, Tab, Box, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

const RoomBookingTab = ({
  upcomingBookings,
  completedBookings,
  cancelledBookings,
}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const getCurrentBookings = () => {
    switch (currentTab) {
      case 0:
        return upcomingBookings;
      case 1:
        return completedBookings;
      case 2:
        return cancelledBookings;
      default:
        return [];
    }
  };

  return (
    <Box sx={{ width: "100%", backgroundColor: "#EAFBFF", padding: "20px" }}>
      {/* Tabs */}
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
        sx={{ marginBottom: "20px" }}
      >
        <Tab label="Sắp tới" />
        <Tab label="Hoàn tất" />
        <Tab label="Đã hủy" />
      </Tabs>

      {/* Filter and Search */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
      >
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          sx={{ textTransform: "none", backgroundColor: "#fff" }}
        >
          Sắp xếp theo: Ngày nhận phòng
        </Button>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "5px 10px",
            width: "300px",
          }}
        >
          <SearchIcon />
          <input
            placeholder="Tìm kiếm theo mã đặt chỗ"
            style={{
              border: "none",
              outline: "none",
              marginLeft: "10px",
              width: "100%",
            }}
          />
        </Box>
      </Box>

      {/* RoomBookingTag List */}
      <Box
        marginTop="20px"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {getCurrentBookings().length > 0 ? (
          getCurrentBookings().map((booking, index) => (
            <RoomBookingTag key={index} booking={booking} />
          ))
        ) : (
          <Box
            textAlign="center"
            marginTop="20px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <img
              src="src/assets/Flight-Planet 1.svg"
              alt="No bookings"
              style={{ marginBottom: "20px" }}
            />
            <p>
              Không có đơn đặt phòng nào trong danh mục{" "}
              {currentTab === 0
                ? "Sắp tới"
                : currentTab === 1
                ? "Hoàn tất"
                : "Đã hủy"}
            </p>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RoomBookingTab;
