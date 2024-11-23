import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Switch,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Calendar from "@toast-ui/react-calendar";
import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Fake service data
const fakeServices = [
  {
    id: "1",
    name: "Room Cleaning",
    schedule: "Daily",
    status: "Active",
    cost: 20,
    enabled: true,
  },
  {
    id: "2",
    name: "Breakfast",
    schedule: "Weekdays",
    status: "Inactive",
    cost: 10,
    enabled: false,
  },
  {
    id: "3",
    name: "Gym Access",
    schedule: "Weekends",
    status: "Active",
    cost: 15,
    enabled: true,
  },
];

// Function to generate schedules for the services
const generateSchedules = (services, year, month) => {
  const schedules = [];

  services.forEach((service) => {
    switch (service.schedule) {
      case "Daily":
        for (let day = 1; day <= 31; day++) {
          const date = new Date(year, month, day);
          if (date.getMonth() === month) {
            schedules.push({
              id: `${service.id}-${day}`,
              calendarId: "1",
              title: service.name,
              category: "time",
              dueDateClass: "",
              start: date,
              end: date,
              isReadOnly: true,
            });
          }
        }
        break;
      case "Weekdays":
        for (let day = 1; day <= 31; day++) {
          const date = new Date(year, month, day);
          if (
            date.getMonth() === month &&
            date.getDay() !== 0 &&
            date.getDay() !== 6
          ) {
            schedules.push({
              id: `${service.id}-${day}`,
              calendarId: "1",
              title: service.name,
              category: "time",
              dueDateClass: "",
              start: date,
              end: date,
              isReadOnly: true,
            });
          }
        }
        break;
      case "Weekends":
        for (let day = 1; day <= 31; day++) {
          const date = new Date(year, month, day);
          if (
            date.getMonth() === month &&
            (date.getDay() === 0 || date.getDay() === 6)
          ) {
            schedules.push({
              id: `${service.id}-${day}`,
              calendarId: "1",
              title: service.name,
              category: "time",
              dueDateClass: "",
              start: date,
              end: date,
              isReadOnly: true,
            });
          }
        }
        break;
      default:
        break;
    }
  });

  return schedules;
};

const RoomBookingCalendar = () => {
  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    // Generate schedules for the services
    const generatedSchedules = generateSchedules(
      fakeServices,
      currentYear,
      currentMonth
    );
    setSchedules(generatedSchedules);
  }, [currentMonth, currentYear]);

  useEffect(() => {
    // Update calendar view to the current month and year
    if (calendarRef.current) {
      const calendarInstance = calendarRef.current.getInstance();
      calendarInstance.setDate(new Date(currentYear, currentMonth));
      calendarInstance.clear();
      calendarInstance.createSchedules(schedules);
    }
  }, [currentMonth, currentYear, schedules]);

  const handleDateClick = (event) => {
    const date = event.date;
    setSelectedDate(date);
    // Simulate API call to get services for the selected date
    setServices(fakeServices);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleServiceToggle = (serviceId) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? { ...service, enabled: !service.enabled }
          : service
      )
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (currentMonth === 0) {
      setCurrentYear((prevYear) => prevYear - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (currentMonth === 11) {
      setCurrentYear((prevYear) => prevYear + 1);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Room Booking Calendar
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <IconButton onClick={handlePrevMonth}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Box>
        <Calendar
          ref={calendarRef}
          height="800px"
          view="month"
          useCreationPopup={false}
          useDetailPopup={false}
          schedules={schedules}
          onClickDay={(event) => handleDateClick(event)}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Services on {selectedDate && selectedDate.toDateString()}
        </DialogTitle>
        <DialogContent>
          <List>
            {services.map((service) => (
              <ListItem key={service.id}>
                <ListItemText
                  primary={service.name}
                  secondary={`Schedule: ${service.schedule}, Status: ${service.status}, Cost: $${service.cost}`}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={service.enabled}
                      onChange={() => handleServiceToggle(service.id)}
                    />
                  }
                  label="Enabled"
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RoomBookingCalendar;
