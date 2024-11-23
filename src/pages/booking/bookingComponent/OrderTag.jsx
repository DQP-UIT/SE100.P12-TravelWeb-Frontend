import React from "react";
import { Box, Typography } from "@mui/material";

const OrderCard = ({ order, handleOnClick }) => {
  return (
    <Box
      className="w-full max-w-md p-4 mb-4 bg-gray-100 shadow-md rounded-lg flex flex-row hover:scale-105"
      border={1}
      borderColor="grey.300"
      onClick={handleOnClick}
    >
      <Box
        component="img"
        src={order.imageUrl}
        alt={order.title}
        sx={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          marginRight: 2,
        }}
      />
      <Box className="flex flex-col">
        <Typography variant="h6" component="div" gutterBottom>
          {order.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Order ID: {order.id}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Customer: {order.customer}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Email: {order.email}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Total: {order.total}
        </Typography>
      </Box>
    </Box>
  );
};

export default OrderCard;
