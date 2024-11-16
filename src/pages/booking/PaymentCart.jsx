import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import OrderTag from "./bookingComponent/OrderTag";

// Fake data to simulate API call
const fakeOrders = [
  {
    id: "12345",
    title: "Order 1",
    customer: "John Doe",
    email: "contentgi@gmail.com",
    total: "$100.00",
  },
  {
    id: "12346",
    title: "Order 2",
    customer: "Jane Smith",
    email: "contentgi@gmail.com",
    total: "$150.00",
  },
  {
    id: "12347",
    title: "Order 3",
    customer: "Alice Johnson",
    email: "contentgi@gmail.com",
    total: "$200.00",
  },
];

const PaymentCart = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // API call
    setOrders(fakeOrders);
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Payment Cart
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center">
        {orders.map((order) => (
          <OrderTag key={order.id} order={order} />
        ))}
      </Box>
    </Container>
  );
};

export default PaymentCart;
