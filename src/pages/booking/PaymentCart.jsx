import React, { useState, useEffect } from "react";
import { Box, Container, TextField, Typography } from "@mui/material";
import OrderTag from "./bookingComponent/OrderTag";

// Fake data to simulate API call
const fakeOrders = [
  {
    id: "12345",
    title: "Order 1",
    customer: "John Doe",
    email: "john.doe@example.com",
    total: "$100.00",
    imageUrl: "https://via.placeholder.com/80",
  },
  {
    id: "12346",
    title: "Order 2",
    customer: "Jane Smith",
    email: "jane.smith@example.com",
    total: "$150.00",
    imageUrl: "https://via.placeholder.com/80",
  },
  {
    id: "12347",
    title: "Order 3",
    customer: "Alice Johnson",
    email: "alice.johnson@example.com",
    total: "$200.00",
    imageUrl: "https://via.placeholder.com/80",
  },
];

const PaymentCart = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate API call
    setOrders(fakeOrders);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrders = orders.filter((order) =>
    order.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="md">
        <Typography variant="h4" component="h1" className="text-center" mb={2}>
          Payment Cart
        </Typography>
        <TextField
          label="Search order"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearchChange}
        />
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={2}
        maxHeight="600px"
        overflow="auto"
        p={2}
        mt={2}
        color="blueviolet"
        className="bg-blue-gray-200"
        border={1}
        borderColor="grey.300"
        borderRadius="8px"
      >
        {filteredOrders.map((order) => (
          <OrderTag key={order.id} order={order} />
        ))}
      </Box>
    </Container>
  );
};

export default PaymentCart;
