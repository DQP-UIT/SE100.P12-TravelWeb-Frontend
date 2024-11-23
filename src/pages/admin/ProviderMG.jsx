import React, { useState, useEffect } from "react";
import { Box, Container, Typography, TextField } from "@mui/material";
import UserTag from "./userMG/UserTag";

// Fake data to simulate API call
const fakeUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    role: "Admin",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "098-765-4321",
    role: "User",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "555-555-5555",
    role: "Moderator",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    name: "Bob Brown",
    email: "bob.brown@example.com",
    phone: "222-333-4444",
    role: "User",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    name: "Charlie Black",
    email: "charlie.black@example.com",
    phone: "555-666-7777",
    role: "Admin",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    name: "Diana White",
    email: "diana.white@example.com",
    phone: "888-999-0000",
    role: "User",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "7",
    name: "Eve Green",
    email: "eve.green@example.com",
    phone: "111-222-3333",
    role: "Moderator",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "8",
    name: "Frank Blue",
    email: "frank.blue@example.com",
    phone: "444-555-6666",
    role: "User",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: "9",
    name: "Grace Yellow",
    email: "grace.yellow@example.com",
    phone: "777-888-9999",
    role: "Admin",
    avatar: "https://via.placeholder.com/150",
  },
];

const ProviderMG = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API call
    setUsers(fakeUsers);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="md" className="mb-4">
      <Typography
        variant="h4"
        component="h1"
        className="text-center"
        gutterBottom
      >
        User Management
      </Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap={2}
        maxHeight="600px"
        overflow="auto"
        className="bg-blue-gray-50"
        p={2}
        border={1}
        borderColor="grey.300"
        borderRadius="8px"
      >
        {filteredUsers.map((user) => (
          <UserTag key={user.id} user={user} />
        ))}
      </Box>
    </Container>
  );
};

export default ProviderMG;
