import React, { useEffect, useRef, useState } from "react";
import Calendar from "@toast-ui/calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";

const fakeBookingData = [
  {
    roomId: "1",
    roomName: "Phòng Deluxe",
    bookings: [
      {
        bookingId: "101",
        customerName: "John Doe",
        start: "2024-11-14T10:00:00",
        end: "2024-11-16T12:00:00",
      },
      {
        bookingId: "102",
        customerName: "Jane Smith",
        start: "2024-11-18T14:00:00",
        end: "2024-11-20T10:00:00",
      },
    ],
  },
  {
    roomId: "2",
    roomName: "Phòng Suite",
    bookings: [
      {
        bookingId: "103",
        customerName: "Alice Brown",
        start: "2024-11-17T09:00:00",
        end: "2024-11-19T11:00:00",
      },
    ],
  },
];

const BookingCalendar = () => {
  const calendarRef = useRef(fakeBookingData);
  const [bookings, setBookings] = useState([]);

  //   useEffect(() => {
  //     // Gọi API để lấy danh sách sự kiện đặt phòng
  //     async function fetchBookings() {
  //       const response = await fetch('/api/bookings'); // Thay bằng API của bạn
  //       const data = await response.json();
  //       setBookings(data);
  //     }

  //     fetchBookings();
  //   }, []);

  useEffect(() => {
    if (!calendarRef.current || bookings.length === 0) return;

    const calendar = new Calendar(calendarRef.current, {
      defaultView: "month", // Hiển thị theo tháng
      useCreationPopup: false,
      useDetailPopup: true,
      taskView: false,
      scheduleView: ["time"],
      calendars: bookings.map((room) => ({
        id: room.roomId,
        name: room.roomName,
        color: "#ffffff",
        bgColor: "#00a9ff",
        borderColor: "#00a9ff",
      })),
    });

    // Chuyển đổi các sự kiện từ API thành dạng sự kiện cho calendar
    const events = bookings.flatMap((room) => {
      return room.bookings.map((booking) => ({
        id: booking.bookingId,
        calendarId: room.roomId, // Mỗi phòng là 1 calendarId
        title: `Đặt bởi ${booking.customerName}`,
        start: booking.start,
        end: booking.end,
        category: "time",
        color: "#ffffff",
        bgColor: "#ff4040", // Màu cho các sự kiện đã đặt
        borderColor: "#ff4040",
      }));
    });

    calendar.createEvents(events);

    // Cleanup khi component bị hủy
    return () => {
      calendar.destroy();
    };
  }, [bookings]);

  return <div ref={calendarRef} style={{ height: "800px" }} />;
};

export default BookingCalendar;
