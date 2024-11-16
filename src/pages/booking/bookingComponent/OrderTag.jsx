import React from "react";
import { Box, Typography } from "@mui/material";

const OrderTag = ({ order }) => {
  const handleOnClick = () =>{
  }
  return (
    <Box
      className="w-full max-w-md p-4 mb-4 bg-white shadow-md rounded-lg flex flex-col hover:scale-110"
      border={1}
      borderColor="grey.300"
      onClick = {handleOnClick}
    >
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
  );
};

export default OrderTag;
