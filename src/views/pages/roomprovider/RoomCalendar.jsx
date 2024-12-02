import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Switch,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
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
    from: new Date(2024, 10, 1),
    to: new Date(2024, 10, 30),
  },
  {
    id: "2",
    name: "Breakfast",
    schedule: "Weekdays",
    status: "Inactive",
    cost: 10,
    enabled: false,
    from: new Date(2024, 10, 1),
    to: new Date(2024, 10, 30),
  },
  {
    id: "3",
    name: "Gym Access",
    schedule: "Weekends",
    status: "Active",
    cost: 15,
    enabled: true,
    from: new Date(2024, 10, 1),
    to: new Date(2024, 10, 30),
  },
  {
    id: "4",
    name: "Spa Service",
    schedule: "Daily",
    status: "Active",
    cost: 50,
    enabled: true,
    from: new Date(2024, 10, 1),
    to: new Date(2024, 10, 30),
  },
  {
    id: "5",
    name: "Laundry Service",
    schedule: "Weekdays",
    status: "Inactive",
    cost: 25,
    enabled: false,
    from: new Date(2024, 10, 1),
    to: new Date(2024, 10, 30),
  },
  {
    id: "6",
    name: "Swimming Pool Access",
    schedule: "Weekends",
    status: "Active",
    cost: 30,
    enabled: true,
    from: new Date(2024, 10, 1),
    to: new Date(2024, 10, 30),
  },
];

const localizer = momentLocalizer(moment);

// Function to generate schedules for the services
const generateSchedules = (services) => {
  const schedules = [];

  services.forEach((service) => {
    const { from, to, schedule, enabled } = service;
    if (!enabled) return;

    const startDate = new Date(from);
    const endDate = new Date(to);

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      schedules.push({
        id: `${service.id}-${date.getDate()}`,
        title: service.name,
        start: new Date(date),
        end: new Date(date),
        allDay: true,
      });
    }
  });

  return schedules;
};

const RoomBookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [services, setServices] = useState(fakeServices);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    // Generate schedules for the services
    const generatedSchedules = generateSchedules(services);
    setSchedules(generatedSchedules);
  }, [services]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const servicesForDate = services.map((service) => {
      const serviceStart = new Date(service.from);
      const serviceEnd = new Date(service.to);
      return {
        ...service,
        enabled: date >= serviceStart && date <= serviceEnd && service.enabled,
      };
    });
    setSelectedServices(servicesForDate);
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

  const handleDateChange = (serviceId, field, value) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? { ...service, [field]: new Date(value) }
          : service
      )
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1)
    );
  };

  return (
    <Container maxWidth="lg">
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
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={handleNextMonth}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Box display="flex">
        <Box flex={2} mr={2}>
          <Calendar
            localizer={localizer}
            events={schedules}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 800 }}
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            onSelectSlot={(slotInfo) => handleDateClick(slotInfo.start)}
            onSelectEvent={(event) => handleDateClick(event.start)}
            selectable
            dayPropGetter={(date) => ({
              style: {
                backgroundColor:
                  selectedDate && moment(date).isSame(selectedDate, "day")
                    ? "#d3d3d3"
                    : undefined,
              },
            })}
            eventPropGetter={(event) => ({
              style: {
                backgroundColor: "#3174ad",
                color: "white",
                borderRadius: "5px",
                padding: "2px 5px",
                fontSize: "10px",
              },
            })}
          />
        </Box>
        <Box flex={1}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Services on {selectedDate && selectedDate.toDateString()}
            </Typography>
            <List>
              {services.map((service) => {
                const serviceStart = new Date(service.from);
                const serviceEnd = new Date(service.to);
                const isServiceEnabled =
                  selectedDate >= serviceStart &&
                  selectedDate <= serviceEnd &&
                  service.enabled;
                return (
                  <ListItem key={service.id}>
                    <ListItemText
                      primary={service.name}
                      secondary={`Schedule: ${service.schedule}, Status: ${service.status}, Cost: $${service.cost}`}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isServiceEnabled}
                          onChange={() => handleServiceToggle(service.id)}
                        />
                      }
                      label="Enabled"
                    />
                    <Box display="flex" flexDirection="column" ml={2} gap={2}>
                      <TextField
                        label="From"
                        type="date"
                        value={moment(service.from).format("YYYY-MM-DD")}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) =>
                          handleDateChange(service.id, "from", e.target.value)
                        }
                      />
                      <TextField
                        label="To"
                        type="date"
                        value={moment(service.to).format("YYYY-MM-DD")}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        onChange={(e) =>
                          handleDateChange(service.id, "to", e.target.value)
                        }
                        inputProps={{
                          min: moment(service.from).format("YYYY-MM-DD"),
                        }}
                      />
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default RoomBookingCalendar;
